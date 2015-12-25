'use strict';

var KeyboardListener = function(game)
{
	var that = {};
	var events = that.events = [];
	var isClose = that.isClose = false;

	var game = that.game = game;

	var keyboard = that.keyboard = Phaser.Keyboard;

	that.addEventListener = function(key, callback)
	{
		if (!that.isClose)
		{
			that.events.push({
				'key': key,
				'callback': callback
			});
		}
	};

	that.init = function()
	{
		if (!that.isClose)
		{
			that.isClose = true;
			for (var i = 0; i < that.events.length; ++i)
			{
				game.input.keyboard.addKey(that.events[i].key).onDown.add(events[i].callback, this);
				game.input.keyboard.removeKeyCapture(that.events[i].key);
			}
		}
	};

	return that;
};
