'use strict';

LoginConfig.$inject = ['$stateProvider', 'lazyImgConfigProvider'];

module.exports = LoginConfig;

/**
 * Инициализация состояния авторизации.
 */
function LoginConfig($stateProvider, lazyImgConfigProvider) {

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'views/main/login.html',
		controller: 'LoginController as ctrl'
	});

	lazyImgConfigProvider.setOption({
		offset: 1000,
		errorClass: null,
		successClass: 'show'
	});

}
