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
	'ui.router',
	'ui.ace',
	'ui.layout',
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
	'spacecraft.welcome',
	'spacecraft.lessons',
	'spacecraft.lessonBoard',
	'spacecraft.lesson',
	'spacecraft.quick',
	'spacecraft.repeatFinished'
]);

app.config(['$urlRouterProvider', function ($urlRouterProvider)
{
	// For any unmatched url, send to ''
	$urlRouterProvider.otherwise('/');
}]);
