/**
 * Created by Ivan on 09.01.2016.
 */

var app = angular.module('spacecraft.quick');

app.config(['$stateProvider', function ($stateProvider)
{
	$stateProvider.state('quick', {
		url: '/quick',
		templateUrl: 'views/quick/quick.html',
		controller: 'QuickController as ctrl'
	});
}]);
