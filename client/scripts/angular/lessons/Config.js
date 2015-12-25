/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lessons');

app.config(['$stateProvider', function ($stateProvider)
{
	// Our first state called `menu`
	$stateProvider.state('lessons', {
		url: '/lessons',
		templateUrl: 'views/lessons/lessons.html',
		controller: 'LessonsController as ctrl'
	});
}]);
