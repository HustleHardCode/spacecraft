'use strict';

/**
 * Created by Ivan on 10.11.2015.
 */
var app = angular.module('spacecraft.statistics', []);

app.service('statistics', function ()
{
	var statistic = [];
	var player = {};

	var setPlayer = function (p)
	{
		player = p;
	};

	var getPlayer = function (p)
	{
		return player;
	};

	var addInformation = function (s)
	{
		statistic.push(s);
	};

	var getInformation = function (s)
	{
		return statistic;
	};

	return {
		setPlayer: setPlayer,
		getPlayer: getPlayer,
		addInformation: addInformation,
		getInformation: getInformation
	}
});
