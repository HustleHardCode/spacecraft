/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.welcome');

app.config(['$stateProvider', function ($stateProvider)
{
	// Our first state called `menu`
	$stateProvider.state('welcome', {
		url: '/',
		templateUrl: 'views/main/welcome.html',
		controller: 'WelcomeController as ctrl'
	});
}]);
