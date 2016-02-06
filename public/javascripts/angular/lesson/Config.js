/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.config(['$stateProvider', function ($stateProvider)
{
	// Our first state called `menu`
	$stateProvider.state('lesson', {
		url: '/lesson/:id',
		templateUrl: 'views/lessons/lesson.html',
		controller: 'LessonController as ctrl'
	});
}]);
