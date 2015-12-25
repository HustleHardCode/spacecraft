'use strict';

/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.errorBoard', []);

app.directive('errorBoard', function ()
{
	var link = function ($scope)
	{
		$scope.closeErrorList = function()
		{
			$scope.editorParams.error = false;
		};
	};

	return {
		scope: {
			editorParams: '='
		},
		templateUrl: 'views/directives/error-board.html',
		link: link
	};
});
