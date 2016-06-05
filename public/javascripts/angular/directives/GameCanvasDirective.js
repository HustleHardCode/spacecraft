'use strict';

/**
 * @ngdoc directive
 * @name spacecraft.directive:gameCanvas
 * @description
 * # gameCanvas
 */
var app = angular.module('spacecraft.gameCanvas', []);

app.directive('gameCanvas', ['statistics', '$state', '$stateParams', function (statistics, $state, $stateParams)
{
	var linkFn = function ($scope)
	{
		/**
		 * Выполняется при уничтожение корабля.
		 * @param player
		 */
		var resultCall = function (player)
		{
			statistics.setPlayer(player);
			$state.go('result');
		};

		var game = CreateGame();

		function CreateGame ()
		{
			var args =
			{
				scope: $scope,
				lessonId: $stateParams.id,
				callers:
				{
					result: resultCall
				}
			};

			return GameTypeGenerator(args);
		}

		//===================================
		//============== SCOPE ==============
		//===================================

		$scope.getNumber = function(num)
		{
			var arr = [];

			for (var i = 0; i < num; i++)
			{
				arr.push(i);
			}

			return arr;
		};

		$scope.$on('$destroy', function()
		{
			game.destroy(); // Clean up the game when we leave this scope
		});
	};

	return {
		scope:
		{
			editorOptions: '='
		},
		templateUrl: 'views/directives/game-canvas.html',
		link: linkFn
	};

}]);
