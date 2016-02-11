/**
 * Created by vladthelittleone on 23.12.15.
 */
var app = angular.module('spacecraft.lessonBoard', []);

app.directive('lessonBoard', ['$sce', function ($sce)
{
	var link = function ($scope)
	{
		$scope.getContent = function ()
		{
			return $sce.trustAsHtml($scope.lesson.content());
		};

		$scope.getInstructions = function ()
		{
			return $sce.trustAsHtml($scope.lesson.instructions);
		};

		$scope.toggleHint = function ()
		{
			$scope.showHint = !$scope.showHint;
		};

		$scope.showHint = function ()
		{
			var enjoyHint = new EnjoyHint(
			{
				onEnd: function ()
				{

				}
			});

			if ($scope.lesson.hint)
			{
				enjoyHint.set($scope.lesson.hint);
				enjoyHint.run();
			}
		};
	};

	return {
		scope:
		{
			lesson: '=',
			text: '=',
			quote: '='
		},
		templateUrl: 'views/directives/lesson-board.html',
		link: link
	};
}]);
