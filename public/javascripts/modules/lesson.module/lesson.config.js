'use strict';

LessonConfig.$inject = ['$stateProvider'];

var resolve = require('./lesson.resolve').values;

module.exports = LessonConfig;

/**
 * Инициализация состояния урока.
 */
function LessonConfig($stateProvider) {

	$stateProvider.state('lesson', {
		url:         '/lesson/:id',
		templateUrl: 'views/lessons/lesson.html',
		controller:  'LessonController as ctrl',
		resolve:     resolve
	});

}
