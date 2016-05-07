/**
 * Created by Ivan on 07.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.gameservice', []);

app.factory('gameservice', ['$http', function ($http)
{
	var errorWrapper = function (value)
	{
		return '<p>### Неисправность!! EГГ0Г!!</p> ' +
			'<p>### Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">### 0шибка: ' + value + '</p>' +
			'<p>### Пожалуйста исправте ситуацию.</p>';
	};

	function checkAndSaveCode(data)
	{
		if(data)
		{
			return data;
		}
		else
		{
			$http({
				method: 'GET',
				url: 'javascripts/code/game.js'
			}).success(function (date)
			{
				return date;
			});
		}
	}

	var requestForCode = function ()
	{
		var code = "";

		$http({
			method: 'GET',
			url: '/statistic/code'
		}).then(function(result)
		{
			code = checkAndSaveCode(result.data);
		});

		return code;
	};

	var saveCode = function (data)
	{
		$http({
			method: 'POST',
			url: '/statistic/code',
			data:
			{
				code: data
			}
		});
	};

	return{
		errorWrapper: errorWrapper,
		requestForCode: requestForCode,
		saveCode: saveCode
	};
}]);
