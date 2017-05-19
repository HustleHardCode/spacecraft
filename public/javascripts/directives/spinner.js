'use strict';

Spinner.$inject = ['$rootScope', '$timeout', '$transitions'];

var lodash = require('lodash');

var spinnerMessages = require('./../utils/json/messages/spinner.json');

module.exports = Spinner;

/**
 * Логика срабатывания спиннера опирается на наличие событий $stateChangeStart и $stateChangeSuccess.
 * Модуль ngRoute посредством сигнала события $stateChangeStart сообщает нам о том, что пользователь
 * переходит на другое состояние. В этот момент, начинаем показ спиннера.
 * Событие $stateChangeSuccess от ngRoute сообщает о том, что переход на состояние успешно завершено.
 * Останавливаем показ спиннера в этот момент.
 *
 * Для явной просьбы старта/останова спиннера, со стороны пользовательского кода, введено прослушивание событий:
 * - startSpinnerForcibly;
 * - stopSpinnerForcibly.
 * Обработчик события startSpinnerForcibly ожидает текст сообщения,
 * которое затем необходимо отобразить под спиннером (без такой необходимости, сообщение можно опустить).
 *
 * @author iretd
 * @since 29.04.2017
 */
function Spinner($rootScope, $timeout, $transitions) {

	var visible = false;

	// MILLISECONDS
	var DEFAULT_DELAY = 1000;

	var directive = {
		templateUrl: 'views/directives/spinner.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link(scope, element) {

		$rootScope.$on('setSpinnerMessage', onSetSpinnerMessage);
		// startSpinnerForcibly - событие, на которое в сию секунду осуществляется показ спинера.
		// На случай, когда какой-либо код требует показ спинера.
		$rootScope.$on('startSpinnerForcibly', onStartSpinnerForcibly);
		// stopSpinnerForcibly - событие, на которое в сию секунду прекращается показ спинера.
		$rootScope.$on('stopSpinnerForcibly', updateSpinnerState.bind(null, {visible: false}));

		$transitions.onStart({}, updateSpinnerState.bind(null, {visible: true, delay: DEFAULT_DELAY}));
		$transitions.onSuccess({}, updateSpinnerState.bind(null, {visible: false}));
		// $rootScope.$on('$stateChangeStart', updateSpinnerState.bind(null, {visible: true, delay: DEFAULT_DELAY}));
		// $rootScope.$on('$stateChangeSuccess', updateSpinnerState.bind(null, {visible: false}));

		updateSpinnerState({visible: false});

		function onSetSpinnerMessage(event, message) {

			updateSpinnerState({message: message});

		}

		function onStartSpinnerForcibly(event, args) {

			// Если спиннер уже отображается, то обновляем только сообщение.
			if (visible) {

				updateSpinnerState({message: args.message});

			} else {

				updateSpinnerState({
									   visible: true,
									   message: args.message,
									   delay:   lodash.isNil(args.delay) ? DEFAULT_DELAY : args.delay
								   });

			}

		}

		// Общий метод обновления состояния спиннера.
		// Ожидает на вход объект с возможными параметрами:
		// - visible - флаг показа спиннера;
		// - message - сообщение, которое будет подписано под спиннером;
		// - delay - задержка, с которой будет осуществлен показ спиннера.
		function updateSpinnerState(args) {

			setMessage(args.message);

			// Если определили свойство visible, значит хотим управлять состоянием видимости спиннера.
			if (!lodash.isNil(args.visible)) {

				visible = args.visible;

				// Если задан delay
				if (!lodash.isNil(args.delay)) {

					$timeout(updateSpinnerVisibleState, args.delay);

					return;

				}

				updateSpinnerVisibleState();

			}
		}

		// Обновление состояния видимости спиннера вынесено в отдельный метод с целью
		// улучшения читабельности кода, который пользуется этой логикой.
		function updateSpinnerVisibleState() {

			if (visible) {

				element.removeClass('ng-hide');


			} else {

				// Добавляем класс ТОЛЬКО в случае, если он еще НЕ имеется.
				// Это важно, так как addClass осуществляет добавление
				// без предварительной проверки на существование класса.
				!element.hasClass('hasClass') && element.addClass('ng-hide');

			}

		}

		// Обновление сообщения под спиннером вынесено в отдельный метод с целью
		// улучшения читабельности кода, который пользуется этой логикой.
		function setMessage(message) {

			scope.message = lodash.isNil(message) ? spinnerMessages.default : message;

		}

	}
}
