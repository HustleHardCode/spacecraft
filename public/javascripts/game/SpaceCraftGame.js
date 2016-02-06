'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 */
var SpaceCraftGame = function (spec)
{
	var that = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');

	that.sc = {};

	return that;
};
