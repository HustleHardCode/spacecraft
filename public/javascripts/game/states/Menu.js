'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var MenuState = function (spec)
{
	var that = {};

	var game = spec.game;

	that.create = function ()
	{
		// Calling the load state
		game.state.start('play');
	};

	return that;
};
