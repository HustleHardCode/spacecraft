'use strict';

// Зависимости
var Game = require('../../../game');

var CodeLauncher = Game.codeLauncher;
var UpdateManager = Game.updateManager;
var ContentFactory = Game.content;
var World = Game.world;

var Interpreter = require('./interpreter');
var LessonStatistics = require('../../../utils/lesson-statistics');
var AudioWrapper = require('./audio');

var Diagram = require('../../../directives/shared/diagram.directive/diagram');
var TabHandler = require('../../../emitters/tab-handler');

var lodash = require('lodash');


LessonService.$inject = ['connection',
						 'audioManager',
						 'aceService',
						 'settings',
						 'statisticsStorage'];

module.exports = LessonService;

/**
 * Сервис бизнес-логики контроллера уроков.
 *
 * @author Ivan Mackovchik
 * @since 07.05.2016
 * @see LessonController
 */
function LessonService(connection,
					   audioManager,
					   aceService,
					   settings,
					   statisticsStorage) {

	var that = {};

	// Константа для указания окончания урока в поле currentSubLesson статистики.
	var LESSON_IS_FINISHED = 0;

	var editorSession;					  // Сессия Ace
	var markerId; 						  // Маркер
	var lessonId;						  // Идентификатор урока
	var scope;							  // scope
	var lessons;						  // Массив уроков. Содержит данные по ВСЕМ урокам пользователя.
	var totalFinalScore;				  // Общее число очков за все уроки.

	// Ссылка на подсказку в процессе урока.
	var enjoyHint;

	var audioWrapper = AudioWrapper(audioManager, initNextLessonContent);
	var markers = aceService.getMarkerService;

	// Статистика по ТЕКУЩЕМУ уроку.
	// Текущий - это именно тот, который в данный момент проходит пользователь.
	var currentLessonStatistics = null;

	// Флаг показывающий проходился ли уже ранее данный урок.
	var isCurrentLessonCompleted = false;

	that.setEditorSession = setEditorSession;
	that.setMarkerId = setMarkerId;

	that.getEditorSession = getEditorSession;
	that.getCode = getCode;
	that.getMarkerId = getMarkerId;
	that.getCurrentLessonStatistics = getCurrentLessonStatistics;
	that.getCurrentLessonContentPoints = getCurrentLessonContentPoints;

	that.lessonContent = lessonContent;
	that.initialize = initialize;
	that.initiateRunByUserClick = initiateRunByUserClick;
	that.onLessonStatisticsLoad = onLessonStatisticsLoad;

	that.run = run;
	that.stop = stop;

	that.audioManager = audioWrapper;

	that.clear = clear;

	return that;

	/**
	 * Метод очистки содержимого сервиса.
	 * К примеру, очистка содержимого может понадобиться
	 * в момент прекращения текущей сессии пользователя.
	 */
	function clear() {

		lessons = [];

	}

	/**
	 * Возвращает текущий урок.
	 */
	function getCurrentLesson() {

		return lessons[lessonId];

	}

	/**
	 * Текущий подурок.
	 */
	function currentSubLesson() {

		return scope.lesson.sub[scope.subIndex];

	}

	/**
	 * Возвращает число подуроков в текущем уроке.
	 */
	function getSubLessonCount() {

		return scope.lesson.sub.length;

	}

	/**
	 * Инициализация диаграммы.
	 */
	function initializeDiagram(ch) {

		// Если урок с диграммой, то добавляем панель диаграммы
		if (ch.diagram) {

			// Изменяем диаграмму
			Diagram.change(ch.diagram);

			scope.setContentEnable('diagramEnable');

		}

	}

	/**
	 * Инициализация таблицы.
	 */
	function initializeTable(ch) {

		// Если есть таблица в уроке,
		// то передаем данные таблицы в директиву
		if (ch.lessonTable) {

			scope.lessonTable = ch.lessonTable;

			scope.setContentEnable('tableEnable');

		}

	}

	/**
	 * Инициализация видео.
	 */
	function initializeVideo(ch) {

		if (ch.video) {

			scope.lessonVideo = ch.video;

			!ch.video.hide && scope.setContentEnable('videoEnable');

		}

	}

	/**
	 * Инициализация интерактивного контента: голоса, маркеров редактора, подсказок.
	 *
	 * @param current текущий контекст урока - подурок.
	 */
	function initInteractiveContent(current) {

		var ch = scope.char = current.character[audioWrapper.audioIndex];

		if (ch) {

			// Показываем редактор кода
			scope.hideEditor = false;

			// Инициализация доп. контента
			initializeDiagram(ch);
			initializeTable(ch);
			initializeVideo(ch);

			// Запуск при старте
			if (current.runOnStart) {

				run();

			}

			// Получение маркера подурока
			var m = ch.marker;

			// Создание аудио
			audioWrapper.create(ch.audio);

			// Если включен автозапуск в настройках,
			// то выполняем урока подгрузку.
			if (settings.isActive(settings.AUTORUN)) {

				audioWrapper.play();

				// Постановка на иконку паузы
				scope.audioPause = false;

			} else {

				// Иконка запуска добавляется.
				scope.audioPause = true;

			}

			// ПОДПИСЫВАЕМСЯ НА СОСТОЯНИЕ ВКЛАДКИ
			TabHandler.subscribeOnTabHidden(audioWrapper.pause);
			TabHandler.subscribeOnTabShow(function () {

				// Если не последняя реплика
				// и если не стоит пауза.
				if (!scope.audioPause) {

					audioWrapper.play()
				}

			});

			tryShowHint(ch, function () {

				scope.audioPause = true;

				// Увеличение счетчиа номера трека
				audioWrapper.audioIndex++;

				initNextLessonContent();

				scope.$apply();

			});

			markers().deleteMarkerAndAnnotation(markerId);

			// Обработка отрисовки маркеров
			if (m) {

				markerId = markers().paintMarker(m.x1, m.y1, m.x2, m.y2, m.type);

			}

		}

	}

	/**
	 * Формирование аудио и подсказок для следующего подурока.
	 */
	function initNextLessonContent() {

		var current = currentSubLesson();

		// Регистрируем текущий подурок урока в scope.
		scope.curretSubLesson = current;

		initInteractiveContent(current);

	}

	/**
	 * Запуск подсказки EnjoyHint.
	 */
	function tryShowHint(char, callback) {

		// Удаляем подсказку
		enjoyHint && enjoyHint.trigger("skip");

		var hint = char.hint;

		if (hint) {

			enjoyHint = new EnjoyHint({

				onEnd: function () {

					enjoyHint = null;

					// В случае  true - ждем нажатия на подсказку
					if (char.waitForHint) {

						audioWrapper.onEnd(callback);

					}

				}

			});

			enjoyHint.set(hint);
			enjoyHint.run();

			if (!char.waitForHint) {

				// При окончании трека
				audioWrapper.onEnd(function () {

					// Удаляем подсказку
					enjoyHint && enjoyHint.trigger("skip");

					// Вызываем callback
					callback && callback();

				});

			}

		}
		else {

			audioWrapper.onEnd(callback);

		}

	}

	/**
	 * Инициализация код урока.
	 */
	function initNextLesson() {

		// Текущий подурок
		var current = currentSubLesson();

		// Отправка запроса на получение кода следующего уркоа
		connection.getLessonCodeFromJs(lessonId, scope.subIndex, function (res) {

			var code = res.data;

			// Сохранение в Ace.
			editorSession.setValue(code);

			// Слова BBot'а
			scope.textBot = current.defaultBBot && current.defaultBBot();

			// Добавление кнопки 'Далее'
			scope.nextSubLesson = nextSubLesson;

			initNextLessonContent();

		});

	}


	/**
	 * Обертка, которая знает в каком формате необходимо
	 * сохранять статистику для текущего урока.
	 * Была введена с целью сократить места явной инициализации объекта
	 * статистики для его сохранения в хранилище через метод saveStatistics.
	 *
	 * @param currentSubLesson номер текущего подурока в уроке.
	 * @param isLessonCompleted флаг завершение текущего урока (true - завершен, false - нет).
	 */
	function saveStatisticsWrapper(currentSubLesson, isLessonCompleted) {

		totalFinalScore = totalFinalScore + currentLessonStatistics.getTotalScoreForLesson();

		saveStatistics({
			totalFinalScore: totalFinalScore,
			lesson:          {
				currentSubLesson: currentSubLesson,
				lessonId:         lessonId,
				subLessonCount:   getSubLessonCount(),
				completed:        isLessonCompleted,
				lessonStatistics: currentLessonStatistics
			}
		});
	}

	/**
	 * Сохранение статистики.
	 * Этот метод ничего не знает и НЕ ДОЛЖЕН знать о формате самой статистики.
	 */
	function saveStatistics(args) {

		lessons[args.lesson.lessonId] = args.lesson;

		connection.saveLessonsStatistics(args);

	}

	/**
	 * Задача данного метода выполнить все действия, которые присуще ситуации
	 * окончания текущего подурока.
	 */
	function endCurrentSubLesson() {

		// Увеличиваем индекс текущего подурока на следующий,
		// так как в saveStatisticsWrapper должен передавать индекс
		// именно следующего урока, а не текущего, который пользователь прошел.
		// Именно этим и обусловлено расположение этого выражения здесь.
		++scope.subIndex;

		// Сохраняем статистику текущего положения по уроку.
		saveStatisticsWrapper(scope.subIndex, isCurrentLessonCompleted);

		CodeLauncher.stop();

		// Удаление маркеров
		markers().deleteMarkerAndAnnotation(editorSession, markerId);

		// Ресет параметров подурока.
		resetSubLesson();

		scope.disableLeftContent();

		// Работа с очками по подуроку.
		currentLessonStatistics.subPenaltyPointsForGame();

	}

	/**
	 * Переход на следующий подурок.
	 * Обновление всей информации и очистка старой.
	 */
	function nextSubLesson() {

		var subLessonCountByIndex = getSubLessonCount() - 1;
		var lessonIsNotFinished = scope.subIndex !== subLessonCountByIndex;

		if (lessonIsNotFinished) {

			// Если урок еще не окончен, завершаем текущий подурок,
			// чтобы корректно перейти к следующему.
			endCurrentSubLesson();

			// Обновляем игровые объекты на начальные значения или нет?
			currentSubLesson().gamePostUpdate &&
			!currentSubLesson().isRestartDisabled && Game.restart();

			initNextLesson();

		}
		else {

			// Вызываем метод обработки ситуации ОКОНЧАНИЯ урока.
			endLesson();

		}

	}

	/**
	 * Окончание урока.
	 * Метод вызывается после того, как урок полностью окончен.
	 */
	function endLesson() {

		// Выводим доску оценки подурока
		scope.isStarsVisible = true;
		isCurrentLessonCompleted = true;

		// Вызываем коллбэки, которые подписались на скрытие вкладки,
		// так как на данном этапе урок закончен, и можно считать,
		// что вкладка с уроком будто бы СКРЫТА.
		// А по факту - мы просто останавливаем ВСЕ звуки.
		TabHandler.executeHiddenCallbacks();

		// Очищаем подписичиков на вкладу
		TabHandler.clear();

		// В связи с окончанием урока - обновляем статистику по прохождению урока.
		currentLessonStatistics.incAttemptLessonCount();
		currentLessonStatistics.calculateScoreForLessonEnd();

		// Сохраняем окончательную статистику за урок.
		saveStatisticsWrapper(LESSON_IS_FINISHED, true);

		statisticsStorage.saveUserProgress(totalFinalScore);
	}

	/**
	 * Метод обработки данных по урокам, которые были выгружены либо
	 * с локального хранилища либо с сервера.
	 * На самом деле, совершенно не важно, откуда они были получены,
	 * так как алгоритм их обработки един для всех случаев.
	 * Поэтому он и был вынесен в отдельный метод :)
	 *
	 * @param currentLesson обрабатываемый урок.
	 */
	function prepareLesson(currentLesson) {

		// Инициализируем статистику по текущему уроку.
		currentLessonStatistics.initialize(lessonContent(lessonId), currentLesson);

		if (currentLesson) {

			var size = scope.lesson.sub.length;

			scope.subIndex = currentLesson.currentSubLesson;

			// Индекс подурока (% используется на случай изменений в размерах).
			scope.subIndex = scope.subIndex % size;

			// Если урок был окончен, тогда в currentLessonStatistics необходимо
			// сбросить начальные значение параметров статистики (currentScore; currentRunCount),
			// так как они были иницализированы значениями, которые были актуальны на момент конца урока
			// (см. выше вызов метода initialize, с указанием второго параметра currentLesson).
			// Мы же, в таком случае, начинаем урок заново. Соотв. вся current статистика с прошлой попытки не актуальна.
			if (currentLesson.completed) {

				currentLessonStatistics.resetCurrentResults();

			}

		}

		// Передаем контекстные параметры в текущий стейт игры.
		// Смотреть: content/state.js, метод onContextLoaded.
		Game.pushContextParameters({subIndex: scope.subIndex});

		initNextLesson();

	}

	/**
	 * Загрузка уроков из локального хранилища или удаленного.
	 * Метод сперва пытается выгрузить уроки из локального хранилища (local storage браузера).
	 * Если в браузере отсутствуют данные, то осуществляется попытка выгрузки уроков с сервера.
	 */
	function onLessonStatisticsLoad(lessonStatistics) {

		if (!lessons || !lessons.length) {

			// Запоминаем ссылку на данные по урокам, которые выгрузили с сервера.
			lessons = lessonStatistics.lessons || [];
			totalFinalScore = lessonStatistics.totalFinalScore || 0;

			isCurrentLessonCompleted = !lodash.isNil(lessonStatistics.completed);

		}
	}

	/**
	 * Ресет параметров подурока.
	 */
	function resetSubLesson() {

		// Очищаем диаграмму.
		Diagram.clearChanges();

		// Убираем доски.
		scope.lessonTable = null;
		scope.lessonVideo = null;

		// Реинициализация аудио.
		audioWrapper.audioIndex = 0;

	}

	/**
	 * Ресет параметров урока.
	 */
	function resetLesson({scope: _scope, lessonId: _lessonId}) {

		CodeLauncher.isCodeRunning = false;

		// В каждом случае запуска урока необходимо создавать
		// новый объект currentLessonStatistics, в противном случае,
		// мы будем изменять значение по ссылке, которая уже привязана
		// в массиве к какому-либо уроку.
		currentLessonStatistics = LessonStatistics();

		scope = _scope;
		lessonId = _lessonId;

		resetSubLesson();

		scope.subIndex = 0;
		scope.getCurrentLesson = getCurrentLesson;

	}

	/**
	 * Инициализация.
	 */
	function initialize(args) {

		// Реинициализация параметров урока.
		resetLesson(args);

		// Если статистика по урокам уже была выгружена из хранилища,
		// то просто осуществляем подготовку данных текущего урока
		// перед его началом.
		// В противном случае - осуществляем выгрузку данных,
		// которая в последующем спровоцирует их подготовку перед началом урока.
		prepareLesson(getCurrentLesson());

	}

	/**
	 * Вывод текста BBot'ом
	 *
	 * @param message текст
	 * @param nextSubLesson добавление кнопки 'Далее'
	 */
	function text(message, nextSubLesson) {

		scope.textBot = message;

		// Добавляем ссылку на функцию и кнопку 'Далее'
		scope.nextSubLesson = nextSubLesson;

		// Если цикл не запущен, выполняем обновления scope
		!scope.$$phase && scope.$apply();

	}

	function runNotGameLesson(current) {

		CodeLauncher.isCodeRunning = true;

		if (current.interpreterHandler) {

			// Запуск интерпретатора
			var interpreted = Interpreter.execute(getCode());

			// interpreted может быть равен undefined
			var exception = interpreted && interpreted.exception;

			// Обработка исключения
			if (exception) {

				// Отнимаем очки за исключение.
				currentLessonStatistics.subPointsForException();

				// В случае исключения выводим ошибку
				text(interpreted.message);

				// И меняем стиль бота.
				scope.botCss = 'bbot-wow';

			}
			else {

				var result = current.interpreterHandler(interpreted);

				scope.botCss = result.css;

				if (result.status) {

					text(result.message, nextSubLesson);

				}
				else {

					text(result.message);

					// Отнимаем очки по уроку за некорректный ввод.
					currentLessonStatistics.subPointsForIncorrectInput();

				}

			}

		}

		CodeLauncher.isCodeRunning = false;

	}

	function runGameLesson(current) {

		// Если gamePostUpdate задан, то выполняем обработку кода
		if (current.gamePostUpdate) {

			var code = getCode();

			CodeLauncher.run(code);

			UpdateManager.setPreUpdate(gamePreUpdate);
			UpdateManager.setPostUpdate(gamePostUpdate);

		}

	}

	/**
	 * Коллбек выполняющийся перед обновлением игры
	 */
	function gamePreUpdate() {

		var current = currentSubLesson();

		current.gamePreUpdate && current.gamePreUpdate(audioWrapper.audioIndex, run);

	}

	/**
	 * Коллбек выполняющийся при обновлении игры
	 */
	function gamePostUpdate(botText) {

		var current = currentSubLesson();
		var player = World.getPlayer();

		var result = current.gamePostUpdate(player.api, currentLessonStatistics, botText);

		if (result && result.status) {

			scope.botCss = result.css;

			text(result.message, nextSubLesson);

			return true;

		}

		if (result && result.message) {

			scope.botCss = result.css;

			text(result.message);

			return true;

		}

	}

	/**
	 * Вызов данного метода осуществляется только и только по факту
	 * нажатия пользователем кнопки запуска кода.
	 */
	function initiateRunByUserClick() {

		// Увеличиваем счетчик запуска кода пользователем.
		currentLessonStatistics.incRunCount();

		run();

	}

	/**
	 * Запуск кода пользователя.
	 * Вызов данного метода может инициировать не только нажатие пользователем на
	 * кнопку запуска кода.
	 * К примеру, на некоторых подуроках, необходимо осуществлять выполнение кода ПРОГРАММНО,
	 * без предварительного клика по кнопке от пользователя.
	 */
	function run() {

		var current = currentSubLesson();

		if (current.interpreterHandler) {

			runNotGameLesson(current);

		}
		else {

			runGameLesson(current);

		}

	}

	/**
	 * Остановка кода.
	 */
	function stop() {

		CodeLauncher.stop();

	}

	/**
	 * Контент урока
	 */
	function lessonContent(num) {

		var currentContent = ContentFactory.content(num);

		return currentContent && currentContent.lessonContent;

	}

	function setEditorSession(value) {

		editorSession = value;

	}

	// GETTERS
	//=================================

	function getEditorSession() {

		return editorSession;

	}

	function getCode() {

		return editorSession.getDocument().getValue();

	}

	function getMarkerId() {

		return markerId;

	}

	function setMarkerId(id) {

		markerId = id;

	}

	function getCurrentLessonStatistics() {

		return currentLessonStatistics;

	}

	function getCurrentLessonContentPoints() {

		return that.lessonContent(lessonId).points;

	}
}
