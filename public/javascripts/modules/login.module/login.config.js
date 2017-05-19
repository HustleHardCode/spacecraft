'use strict';

LoginConfig.$inject = ['$stateProvider'];

var lodash = require('lodash');

var resolveNames = require('./login.resolve').names;
var resolve = require('./login.resolve').values;

module.exports = LoginConfig;

/**
 * Инициализация состояния авторизации.
 */
function LoginConfig($stateProvider) {

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'views/main/login.html',
		controller: 'LoginController as ctrl',
		resolve: resolve,
		onEnter: ['$state', resolveNames.authentication, onEnter]
	});

	/**
	 * Метод обработки факта попадания пользователем на состояние 'login'
     */
	function onEnter($state, authenticationStatus) {

		if (authenticationStatus) {

			$state.go('welcome');

		}

	}

}
