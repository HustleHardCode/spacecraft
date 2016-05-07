/**
 * Created by Ivan on 07.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.lessonservice', []);

app.factory('lessonservice', ['$storage', '$http', function ($storage, $http)
{
	/**
	 * Local storage
	 */
	var st =
	{
		set: function(name, value)
		{
			$storage.local.setItem(name, JSON.stringify(value));
		},
		getCurrent: function(name)
		{
			var l = JSON.parse($storage.local.getItem('lessons'));

			if (l && l[name])
			{
				return parseInt(l[name].current) - 1;
			}

			return 0;
		},
		getLessons: function ()
		{
			return JSON.parse($storage.local.getItem('lessons')) || [];
		}
	};

	var errorWrapper = function (value)
	{
		return '<p>### Неисправность!! EГГ0Г!!</p> ' +
			'<p>### Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">### 0шибка: ' + value + '</p>' +
			'<p>### Пожалуйста исправте ситуацию.</p>';
	};

	var saveStatisticLesson = function (args)
	{
		$http({
			url: '/statistic/lessons',
			method: 'POST',
			data: args
		});
	};

	return {
		errorWrapper: errorWrapper,
		saveStatisticLesson: saveStatisticLesson,
		st: st
	}
}]);
