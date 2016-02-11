/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.documentation', []);

app.directive('documentation', function ()
{
	var link = function ($scope)
	{
		//===================================
		//============== FUNCTION ===========
		//===================================

		$scope.functionDoc = {};
		$scope.functionDocOpen = false;

		$scope.openFunctionDoc = function (v)
		{
			$scope.functionDoc = documentation[v];
			$scope.functionDocOpen = true;
		};

		$scope.$watch('hide', function ()
		{
			$scope.functionDocOpen = false;
		})
	};

	return {
		scope: {
			hide: '='
		},
		templateUrl: 'views/directives/documentation.html',
		link: link
	};
});
