/**
 * Created by Ivan on 18.01.2016.
 */
var app = angular.module('spacecraft.repeatFinished', []);

app.directive('repeatFinished', function ()
{
	return function (scope)
	{
		if (scope.$last) setTimeout(function ()
		{
			scope.$emit('ngRepeatFinished');
		}, 1);
	}
});
