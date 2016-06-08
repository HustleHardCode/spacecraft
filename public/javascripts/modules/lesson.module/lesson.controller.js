'use strict';

LessonController.$inject = ['$scope', '$stateParams', '$state', 'lessonService', 'audioManager', 'aceService'];

module.exports = LessonController;

/**
 * Контрллер окна урока.
 *
 * Created by vladthelittleone on 30.11.15.
 */
function LessonController($scope, $stateParams, $state, service, audioManager, aceService) {

	var markerService;

	$scope.starsHide = false;	// Переключатель окна оценки урока
	$scope.hideEditor = false;	// Переключатель окна урока
	$scope.audioPause = false;	// Переключатель кнопки паузы панели управления
	$scope.textContent = false; // Переключатель текстового контента урока
	$scope.hint = false;		// Переключатель подсказок

	$scope.idLesson = $stateParams.id;						// Идентификатор урока
	$scope.options = service.options;						// Конфигурация кода и редактора
	$scope.lesson = service.lessonContent($stateParams.id);	// Контент урока

	$scope.toggleTextContent = toggleTextContent;
	$scope.toggleAudioPause = toggleAudioPause;
	$scope.previousAudio = previousAudio;
	$scope.toggleEditorOpen = toggleEditorOpen;
	$scope.aceChanged = aceChanged;
	$scope.aceLoaded = aceLoaded;
	$scope.run = service.run;

	$scope.$watch('options.error', onError);
	$scope.$watch('$viewContentLoaded', onContentLoaded);

	// ==================================================

	// Проверка существования урока
	if (!$scope.lesson) {

		$state.go('lessons');

	}

	// ==================================================

	function toggleTextContent() {

		$scope.textContent = !$scope.textContent;

	}

	function toggleAudioPause() {

		service.audioManager.toggleAudio($scope.audioPause);

		$scope.audioPause = !$scope.audioPause;

	}

	function previousAudio() {

		if (service.audioManager.previousAudio()) {

			$scope.audioPause = false;

		}

	}

	function toggleEditorOpen() {

		$scope.hideEditor = !$scope.hideEditor;

	}

	/**
	 * Обработчик изменения кода в Ace.
	 */
	function aceChanged() {

		$scope.options.code = service.getCode();

	}

	/**
	 * Инициализация Ace.
	 */
	function aceLoaded(editor) {

		service.setEditorSession(editor.getSession());

		aceService.initialize(editor);

		markerService = aceService.getMarkerService();

		/**
		 * Инициализация урока.
		 */
		service.initialize({
			lessonId: $stateParams.id,
			scope:    $scope
		});
	}

	/**
	 * Обработка ошибки при запуске пользовательского кода.
	 */
	function onError(value) {

		var editorSession = service.getEditorSession();

		var markerId = service.getMarkerId();

		// Удаляем старый маркер
		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);

		// Выводим текст
		$scope.textBot = value;

		if (value) {

			// Номер ошибки кода
			var errorLine = $scope.options.error.stack.split(':')[6] - 2;

			// Выводим ошибку
			$scope.textBot = errorWrapper(value);

			// Указываем маркер
			markerId = markerService.setMarkerAndAnnotation(editorSession, errorLine, $scope.options.error);

			// Сохраняем в сервисе.
			// В связи с использованием указаний в уроке.
			service.setMarkerId(markerId);

		}

	}

	/**
	 * При загрузке запускаем звук.
	 */
	function onContentLoaded() {

		audioManager.createSoundtrack().play();

	}

	function errorWrapper(value) {

		return '<p>Неисправность!! EГГ0Г!!</p> ' +
			'<p>Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">0шибка: ' + value + '</p>' +
			'<p>Пожалуйста исправте ситуацию.</p>';

	}
}
