'use strict';

WelcomeConfig.$inject = ['$stateProvider', 'ChartJsProvider', 'lazyImgConfigProvider'];

module.exports = WelcomeConfig;

/**
 * Инициализация состояния главной страницы.
 */
function WelcomeConfig($stateProvider, ChartJsProvider, lazyImgConfigProvider) {

	// Настройка всех графиков
	ChartJsProvider.setOptions({
		colours:    ['#152B39', '#C5C8C6'],
		responsive: true
	});

	// Конфигурация графиков линейных
	ChartJsProvider.setOptions('Line', {
		datasetFill: false
	});

	lazyImgConfigProvider.setOption({
		offset: 1000,
		errorClass: null, 
		successClass: 'show'
	});

	$stateProvider.state('welcome', {
		url: '/',
		templateUrl: 'views/main/welcome.html',
		controller: 'WelcomeController as ctrl'
	});

}

