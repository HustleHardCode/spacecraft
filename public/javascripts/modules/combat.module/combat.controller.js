'use strict';

const CodeLauncher = require('../../game/launcher');
const TabHandler = require('../../emitters/tab-handler');
const spinnerMessages = require('../../utils/json/messages/spinner.json');
const resolvesNames = require('./combat.resolve').names;
const Game = require('./../../game');

const lodash = require('lodash');

CombatController.$inject = ['$scope',
							'audioManager',
							'aceService',
							'connection',
							'settings',
							'spinner',
							resolvesNames.combatUserCode,
							resolvesNames.combatEnemy];

module.exports = CombatController;

/**
 * Контроллер окна урока.
 *
 * @author Skurishin Vladislav
 * @since 30.11.2015
 */
function CombatController($scope,
						  audioManager,
						  aceService,
						  connection,
						  settings,
						  spinner,
						  combatUserCode,
						  combatEnemy) {

	const VK_GROUP_ID = 105816682;

	// Статус НЕГОТОВНОСТИ программного кода участвовать в боях с другими игроками.
	const CODE_STATUS_INACTIVE = 0;
	// Статус ГОТОВНОСТИ программного кода участвовать в боях с другими игроками.
	const CODE_STATUS_ACTIVE = 1;

	// Храним последнее значение прогр. кода, которое сохранили на стороне сервиса, во избежание
	// отправки избыточных запросов на сохранение.
	let lastSavedCode;

	let markerService;
	let soundtrack;
	let markerId;

	CodeLauncher.onError = onError;

	$scope.hideEditor = false;		    // Переключатель окна урока
	$scope.CodeLauncher = CodeLauncher;	// Конфигурация кода и редактора

	$scope.toggleEditorOpen = toggleEditorOpen;
	$scope.toggleVkWidgetVisible = toggleVkWidgetVisible;
	$scope.toggleContentEnable = toggleContentEnable;
	$scope.aceChanged = aceChanged;
	$scope.aceLoaded = aceLoaded;
	$scope.toggleCodeRun = toggleCodeRun;
	$scope.clickSaveButton = clickSaveButton;
	$scope.onError = onError;

	$scope.$watch('$viewContentLoaded', onContentLoaded);
	$scope.$on('$destroy', onDestroy);

	initVk();

	initCombat();

	// ==================================================

	function initVk() {

		try {

			$scope.vkWidget = VK.Widgets.CommunityMessages("vkCommunityMessages", VK_GROUP_ID, {
				widgetPosition:         "right",
				disableExpandChatSound: "1",
				disableButtonTooltip:   "1",
				buttonType:             "no_button"
			});

		} catch (e) {

			$scope.vkWidgetEnable = false;

		}

	}

	function initCombat() {

		console.log(Game.world.getEnemies());

	}

	function clickSaveButton() {

		tryToSaveCombatUserCode({
									code:   aceService.getValue(),
									status: CODE_STATUS_INACTIVE
								});

	}

	/**
	 * Метод пытается сохраненить программный код пользователя на сервере.
	 * Метод осуществляет отправку запроса на сохранение только в случае, если:
	 * 1) текущий код в редакторе синтаксически корректен;
	 * 2 )текущий код в редакторе НЕ совпадает с последним сохраненным.
	 * Также, метод берет на себя обязанность отображения спиннера, в случае
	 * продолжительности отбработки запроса на сохранение более чем на 500мс.
	 *
	 * @param args агрументами метода являются:
	 *             code - программный код;
	 *             codeStatus - статус кода;
	 *             success - коллбэк для вызова в случае успешного сохранения;
	 *             error - коллбэк для вызова с случае неуспешного сохранения.
	 */
	function tryToSaveCombatUserCode(args) {

		let {
				code,
				status,
				success,
				error
			} = args;

		if (isCodeSyntacticallyCorrect()) {

			if (lastSavedCode !== code) {

				spinner.start({message: spinnerMessages.clickSaveButton, delay: 500});

				connection.saveCombatUserCode({code, status},
											  onSaveSuccess,
											  onSaveError);

			} else {

				success && success();

			}

		} else {

			error && error();

		}

		function onSaveSuccess() {

			lastSavedCode = code;

			spinner.stop();

			success && success();

		}

		function onSaveError() {

			spinner.stop();

			error && error();

		}

	}

	/**
	 * Метод позволяет выяснить - имеются ли в коде редактора
	 *
	 * @returns {boolean} логическое значение о наличии синтаксических ошибок в коде.
	 */
	function isCodeSyntacticallyCorrect() {

		const editorSession = aceService.getSession();
		// Выделяем аннотации об ошибках в программном коде.
		const errors = lodash.filter(editorSession.getAnnotations(), {type: 'error'});

		return lodash.isEmpty(errors);

	}

	/**
	 * Обощенная функция, который открывает(делает видимым)
	 * окно с необходимым контентом
	 */
	function toggleContentEnable(content) {

		var currentState = $scope[content];

		disableLeftContent();

		$scope[content] = !currentState;

	}

	/**
	 * Функция закрывает все окна
	 */
	function disableLeftContent() {

		$scope.textContentEnable = false;	// Переключатель текстового контента урока
		$scope.disqusEnable = false;		// Переключатель комментариев
		$scope.diagramEnable = false;		// Переключатель окна диаграммы
		$scope.tableEnable = false;			// Переключатель таблички
		$scope.settingsEnable = false;		// Переключатель натсроек
		$scope.vkWidgetEnable = false;		// Переключатель отображения виджета vk сообщений

	}

	function toggleVkWidgetVisible() {

		if ($scope.vkWidgetEnable) {

			$scope.vkWidget.minimize();

		} else {

			$scope.vkWidget.expand();

		}

		$scope.vkWidgetEnable = !$scope.vkWidgetEnable;

	}

	function toggleEditorOpen() {

		$scope.hideEditor = !$scope.hideEditor;

	}

	/**
	 * Обработчик изменения кода в Ace.
	 */
	function aceChanged() {

		//

	}

	/**
	 * Инициализация Ace.
	 */
	function aceLoaded(editor) {

		aceService.initialize(editor);

		markerService = aceService.getMarkerService();

		var editorSession = aceService.getSession();

		editorSession.setValue(combatUserCode);

	}

	/**
	 * Очистка маркеров.
	 */
	function clearMarker() {

		// Удаляем старый маркер
		markerId && markerService.deleteMarkerAndAnnotation(markerId);

		return markerId;

	}

	/**
	 * Обработка ошибки при запуске пользовательского кода.
	 */
	function onError(error) {

		// Очищаем 'Кнопку далее'
		$scope.nextSubLesson = null;

		CodeLauncher.stop();

		markerId = clearMarker();

		// Выводим текст
		$scope.textBot = error;

		if (error) {

			// Номер ошибки кода
			var errorLine = error.stack.split(':')[6] - 2;

			// Выводим ошибку
			$scope.textBot = errorWrapper(error);
			$scope.botCss = 'bbot-angry';

			if (errorLine) {

				// Указываем маркер
				markerId = markerService.setMarkerAndAnnotation(errorLine, error);

			}

		}

		$scope.$apply();

	}

	/**
	 * Выключение / Включение фоновой музыки.
	 */
	function setSoundtrackEnable(enable) {

		if (enable) {

			playSoundtrack();

		} else {

			soundtrack && soundtrack.pause();

		}

	}

	/**
	 * При загрузке запускаем звук.
	 */
	function onContentLoaded() {

		// Если настройка музыки активна,
		settings.onSettingsChange(setSoundtrackEnable, settings.SOUNDTRACK, true);

	}

	function playSoundtrack() {

		soundtrack = audioManager.createSoundtrack();
		soundtrack.play();

		// ПОДПИСЫВАЕМСЯ НА СОСТОЯНИЕ ВКЛАДКИ.
		TabHandler.subscribeOnTabHidden(audioManager.pauseSoundtrack);
		TabHandler.subscribeOnTabShow(resumeSoundtrackWrapper);

	}

	/**
	 * Обертка вокруг метода audioManager.
	 * Проверяет не отключен ли уже саундтрек в настройках.
	 * Если он отключен, то не подписываемся на запуск при
	 * смене закладки.
	 */
	function resumeSoundtrackWrapper() {

		// Аналогичная проверка ведется в lessonService
		// с аудиодорожкой. (НА ПАУЗУ)
		if (settings.isActive(settings.SOUNDTRACK)) {

			audioManager.resumeSoundtrack();

		}

	}

	/**
	 * Запуск / Пауза кода.
	 */
	function toggleCodeRun() {

		clearMarker();

		// Если нет ссылки на следующий урок,
		// удаляем вывод бота
		if (!$scope.nextSubLesson) {

			$scope.textBot = null;

		}

		if (CodeLauncher.isCodeRunning) {

			CodeLauncher.stop();

		} else {

			const code = aceService.getValue();
			// При попытке запуске кода
			// выключаем окно настроек.
			$scope.settingsEnable = false;

			tryToSaveCombatUserCode({
										code:    code,
										status:  CODE_STATUS_ACTIVE,
										success: CodeLauncher.run.bind(CodeLauncher, code)
									});

		}

	}

	function onDestroy() {

		TabHandler.clear();

	}

	function errorWrapper(value) {

		return '<p>Неисправность!! EГГ0Г!!</p> ' +
			   '<p>Дроид BBot не может понятb к0д 4еловека.</p>' +
			   '<p class="red-label">0шибка: ' + value + '</p>' +
			   '<p>Пожалуйста, исправьте ситуацию.</p>';

	}
}
