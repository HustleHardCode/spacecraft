'use strict';

/**
 * Created by vladthelittleone on 07.01.16.
 */
var app = angular.module('spacecraft.interpreter', []);

app.service('interpreter', function ()
{
	var Interpreter = function ()
	{
		var that = {};
		var array = that.array = [];

		that.execute = function (code)
		{
			// очищаем от старых значений
			array = [];

			try
			{
				/**
				 * Функция для интерпретации.
				 * Используется для вывода сообщения в окно BBot'а.
				 */
				var BBotDebug = function (value)
				{
					array.push(value);
				};

				var result = eval(code);

				if (array.length)
				{
					return array;
				}

				return result;
			}
			catch (ex)
			{
				return {
					exception: true,
					message: ex.message
				}
			}
		};

		return that;
	};


	return Interpreter();
});
