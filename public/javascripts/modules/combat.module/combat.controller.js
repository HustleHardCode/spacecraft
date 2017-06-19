'use strict';

// Зависимости
const CodeLauncher = require('../../game/launcher');
const TabHandler = require('../../emitters/tab-handler');
const resolvesNames = require('./combat.resolve').names;

const lodash = require('lodash');

CombatController.$inject = ['$scope',
							'audioManager',
							'aceService',
							'connection',
							'settings',
							'$localStorage',
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
						  $localStorage,
						  combatUserCode,
						  combatEnemy) {

	var VK_GROUP_ID = 105816682;

	var markerService;
	var soundtrack;
	var markerId;

	CodeLauncher.onError = onError;

	$scope.hideEditor = false;		    // Переключатель окна урока
	$scope.CodeLauncher = CodeLauncher;	// Конфигурация кода и редактора

	$scope.toggleEditorOpen = toggleEditorOpen;
	$scope.toggleVkWidgetVisible = toggleVkWidgetVisible;
	$scope.toggleContentEnable = toggleContentEnable;
	$scope.aceChanged = aceChanged;
	$scope.aceLoaded = aceLoaded;
	$scope.toggleCodeRun = toggleCodeRun;
	$scope.onError = onError;

	$scope.$watch('$viewContentLoaded', onContentLoaded);
	$scope.$on('$destroy', onDestroy);

	initVk();

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

		// Отправка запроса на получение кода следующего уркоа
		connection.getCombatCodeFromJs('start', function (res) {

			var code = res.data;

			// Сохранение в Ace.
			editorSession.setValue(code);

		});

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

		if (!CodeLauncher.isCodeRunning) {

			var editorSession = aceService.getSession();
			var code = editorSession.getDocument().getValue();

			CodeLauncher.run(code);

			// При запуске кода
			// выключаем окно настроек.
			$scope.settingsEnable = false;

		}
		else {

			CodeLauncher.stop();

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
