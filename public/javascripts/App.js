'use strict';

/**
 * @ngdoc overview
 * @name  Spacecraft
 * @description
 * # spacecraft
 *
 * Main module of the application.
 */
var app = angular.module('spacecraft', [
	'chart.js',
	'ui.router',
	'ui.ace',
	'ui.layout',
	'ui.bootstrap',
	'spacecraft.storage',
	'spacecraft.autocompleter',
	'spacecraft.statistics',
	'spacecraft.lessonProvider',
	'spacecraft.interpreter',
	'spacecraft.bbotBoard',
	'spacecraft.gameCanvas',
	'spacecraft.documentation',
	'spacecraft.game',
	'spacecraft.result',
	'spacecraft.welcome',
	'spacecraft.lessons',
	'spacecraft.lessonBoard',
	'spacecraft.lesson',
	'spacecraft.quick',
	'spacecraft.repeatFinished'
]);

app.config(['$urlRouterProvider','ChartJsProvider', function ($urlRouterProvider, ChartJsProvider)
{
	// For any unmatched url, send to ''
	$urlRouterProvider.otherwise('/');

	// Configure all charts
	ChartJsProvider.setOptions({
		colours: ['#FF5252', '#FF8A80'],
		responsive: false
	});
	// Configure all line charts
	ChartJsProvider.setOptions('Line', {
		datasetFill: false
	});
}]);
