/**
 * Created by Ivan on 23.03.2016.
 */
var app = angular.module('spacecraft.stars', []);

app.directive('stars', [function()
{
	function link ()
	{

	}

	return {
		scope: {

		},
		templateUrl: 'views/directives/stars.html',
		link: link
	};
}]);
