'use strict';

var angular = require('angular');

require('angular-ui-router');
require('angular-ui-layout');
require('angular-ui-ace');

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
configBlock.$inject = ['$urlRouterProvider', 'ChartJsProvider', 'lazyImgConfigProvider'];

angular.module('spacecraft').config(configBlock);
angular.module('spacecraft').run(runBlock);

/**
 * Конфигурация сервисов до старта приложения.
 */
function configBlock($urlRouterProvider, ChartJsProvider, lazyImgConfigProvider) {

	// Для всех необработанных переходов
	$urlRouterProvider.otherwise('/');

	lazyImgConfigProvider.setOption({
		offset: 1000,
		errorClass: null,
		successClass: 'show'
	});

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
