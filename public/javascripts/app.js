'use strict';

var angular = require('angular');
var lodash = require('lodash');

require('angular-ui-router');
require('angular-ui-layout');
require('angular-ui-ace');
require('angular-http-auth');
require('angular-cookies');
require('angular-messages');
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-youtube-embed');

/**
 * Подключаем изменение прототипа.
 */
require('./extends');

/**
 * Загружаем модули.
 */
require('./modules');

/**
 * @description Главный модуль angularJS,
 * описывающий все модули.
 */
angular.module('spacecraft', [
		'ui.router',
		'ui.ace',
		'ui.layout',
		'ui.bootstrap',
		'spacecraft.modules',
		'http-auth-interceptor',
		'ngCookies',
		'ngMessages',
		'ngAnimate',
		'youtube-embed'
	])
	.config(configBlock)
	.run(runBlock);


/**
 * Загружаем директивы, сервисы.
 */
require('./services');
require('./directives');

runBlock.$inject = ['$rootScope', '$state'];
configBlock.$inject = ['$urlRouterProvider', '$locationProvider'];

angular.module('spacecraft').config(configBlock);
angular.module('spacecraft').run(runBlock);

/**
 * Конфигурация сервисов до старта приложения.
 */
function configBlock($urlRouterProvider, $locationProvider) {

	// Включаем адреса без решетки (#).
	$locationProvider.html5Mode({

									enabled:      true,
									rewriteLinks: false

								});

	// Для всех необработанных переходов
	$urlRouterProvider.otherwise('/');

}

/**
 * Запуск скрипта на старте приложения.
 */
function runBlock($rootScope, $state) {

	initializeStateHistory($state);

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

		$state.history.push({toState, toParams});

	});

}

/**
 * Метод инициализации хранения истории state'ов в сервисе $state.
 */
function initializeStateHistory($state) {

	// Задает РАЗМЕР истории.
	const MAX_LENGTH = 5;

	$state.history = [];

	/**
	 * Последний элемент истории - это запись о текущем state'е, на который перешел пользователь 
	 * в последний раз.
	 * Для нас актуально знать прошлый state (предпоследний в истории).
	 * 
	 * @returns {Object} предпоследний элемент истории.
     */
	$state.history.getPrevious = function() {

		const previousStateIndex = this.length - 2;

		return this[previousStateIndex];

	};

	/**
	 * Для избежания наличия дублежа состояний в истории, определяем свою логику метода push.
	 * Также, метод push контролирует поддержание ФИКСИРОВАННОЙ размерности истории.
	 *
	 * @param {Object} toState объект определения state'a;
	 * @param {Object} toParams параметры state'a;
	 * @returns {number} размер истории, как это и принято по соглашению метода push в JS.
     */
	$state.history.push = function({toState, toParams}) {

		let lastElement = lodash.last(this);

		let lastStateName = lastElement && lastElement.toState.name;

		if (lastStateName !== toState.name) {

			let newLength = Array.prototype.push.call(this, {toState, toParams});

			// Удаляем первый элемент, если размер истории превышает заданный макс. размер.
			if (newLength === MAX_LENGTH) {

				this.shift();

			}

		}

		return this.length;

	}

}
