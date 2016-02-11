/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.game');

app.config(['$stateProvider', function ($stateProvider)
{
	// Our first state called `menu`
	$stateProvider.state('game', {
		url: '/game',
		templateUrl: 'views/game/game.html',
		controller: 'GameController as ctrl'
	});
}]);
