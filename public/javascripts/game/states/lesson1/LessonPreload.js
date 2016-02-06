'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var LessonPreloadState = function (spec)
{
	var that = {};

	var game = spec.game;

	that.preload = function ()
	{
		game.load.image('spaceCraft', 'images/sprites/spaceCraft/spaceCraft.png');
		game.load.image('starField', 'images/sprites/starField.png');
		game.load.image('bonus1', 'images/sprites/bonus/bonus1.png');
		game.load.image('bonus2', 'images/sprites/bonus/bonus2.png');
		game.load.image('bonus3', 'images/sprites/bonus/bonus3.png');
		game.load.image('userShield', 'images/sprites/shield2.png');
		game.load.spritesheet('explosion', 'images/animations/explosion.png', 128, 128);
	};

	that.create = function ()
	{
		game.state.start('menu');
	};

	return that;
};
