/**
 * Created by vladthelittleone on 23.12.15.
 */
var app = angular.module('spacecraft.lessonBoard', []);

app.directive('lessonBoard', function ()
{
	var link = function ($scope)
	{

	};

	return {
		scope: {
			hide: '='
		},
		templateUrl: 'views/directives/lesson-board.html',
		link: link
	};
});
