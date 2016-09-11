'use strict';

LoginConfig.$inject = ['$stateProvider', 'lazyImgConfig'];

module.exports = LoginConfig;

/**
 * Инициализация состояния авторизации.
 */
function LoginConfig($stateProvider, lazyImgConfig) {
	
	var config = lazyImgConfig();
	
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'views/main/login.html',
		controller: 'LoginController as ctrl'
	});

	config.setOption({
		offset: 1000,
		errorClass: null,
		successClass: 'show'
	});

}
