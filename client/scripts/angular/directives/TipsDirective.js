/**
 * Created by vladthelittleone on 10.11.15.
 */
var app = angular.module('spacecraft.slides', []);

app.directive('slides', ['$sce', '$storage', function ($sce, $storage)
{
	var link = function ($scope)
	{
		function handler(e)
		{
			if(e.keyCode === 39)
			{
				$scope.next();
				$scope.$apply();
			}

			if(e.keyCode === 37)
			{
				$scope.previous();
				$scope.$apply();
			}
		}

		function keyHandler()
		{
			var $doc = angular.element(document);

			$doc.on('keydown', handler);

			$scope.$on('$destroy', function ()
			{
				$doc.off('keydown', handler);
			});
		}

		$scope.showTrick = false;
		$scope.hideTrick = false;

		var index = $storage.local.getItem('tipsAndTricks') ? utils.randomInt(0, slides.length - 1) : 0;

		$scope.t = slides[index];

		$scope.next = function ()
		{
			index = (index + 1) % slides.length;
			$scope.t = slides[index];
		};

		$scope.previous = function ()
		{
			index = index ? (index - 1) % slides.length : slides.length - 1;
			$scope.t = slides[index];
		};

		$scope.getContentTitle = function ()
		{
			return $sce.trustAsHtml($scope.t.title);
		};

		$scope.showHint = function ()
		{
			var enjoyHint = new EnjoyHint({
				onEnd: function ()
				{
					$scope.$apply(function ()
					{
						$scope.showTrick = true;
						$scope.hideTrick = false;
					});
				}
			});

			$scope.showTrick = false;
			$scope.hideTrick = true;

			if ($scope.t.hint)
			{
				enjoyHint.set($scope.t.hint);
				enjoyHint.run();
			}
		};

		$scope.closeTricks = function ()
		{
			$scope.object.hide = true;
			$storage.local.setItem('tipsAndTricks', true);
		};

		$scope.getContentDescription = function ()
		{
			return $sce.trustAsHtml($scope.t.description);
		};

		keyHandler();
	};

	return {
		scope: {
			object: '='
		},
		templateUrl: 'views/directives/tips.html',
		link: link
	};
}]);
