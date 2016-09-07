'use strict';

var angular = require('angular');

require('angular-ui-router');
require('angular-ui-layout');
require('angular-ui-ace');
require('angular-lazy-loader');

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
		'angular-lazy-loader',
		'spacecraft.modules'
	])
	.config(configBlock)
	.run(runBlock);

/**
 * Загружаем директивы, сервисы.
 */
require('./services');
require('./directives');

runBlock.$inject = ['authentication', '$rootScope', '$state'];
configBlock.$inject = ['$urlRouterProvider', 'ChartJsProvider'];

angular.module('spacecraft').config(configBlock);
angular.module('spacecraft').run(runBlock);

/**
 * Конфигурация сервисов до старта приложения.
 */
function configBlock($urlRouterProvider, ChartJsProvider) {

	// Для всех необработанных переходов
	$urlRouterProvider.otherwise('/');

}

/**
 * Запуск скрипта на старте приложения.
 */
function runBlock(authentication, $rootScope, $state) {

	/**
	 * При изменении текущей страницы - state, выполняется callback.
	 */
	$rootScope.$on('$stateChangeSuccess', function () {

		// Текущая страница
		var current = $state.current.name;

		// Если текущая страница не ввода логина
		if (current !== 'login') {

			// Выполняем проверку авторизации пользователя
			authentication.isLoggedIn({

				error: function () {

					// В случае ошибки переходим на страницу логина.
					$state.go('login');

				}

			});

		}

	});

}
