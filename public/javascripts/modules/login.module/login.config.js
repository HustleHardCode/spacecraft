'use strict';

LoginConfig.$inject = ['$stateProvider'];

module.exports = LoginConfig;

/**
 * Инициализация состояния авторизации.
 */
function LoginConfig($stateProvider) {

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'views/main/login.html',
		controller: 'LoginController as ctrl'
	});

}
