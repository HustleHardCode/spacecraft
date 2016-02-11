/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.result');

app.config(['$stateProvider', function ($stateProvider)
{
	// Our first state called `result`
	$stateProvider.state('result', {
		url: '/result',
		templateUrl: 'views/main/result.html',
		controller: 'ResultController as ctrl'
	});
}]);
