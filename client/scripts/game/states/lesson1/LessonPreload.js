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
		game.load.image('spaceCraft', 'resources/assets/sprites/spaceCraft/spaceCraft.png');
		game.load.image('starField', 'resources/assets/sprites/starField.png');
		game.load.image('bonus1', 'resources/assets/sprites/bonus/bonus1.png');
		game.load.image('bonus2', 'resources/assets/sprites/bonus/bonus2.png');
		game.load.image('bonus3', 'resources/assets/sprites/bonus/bonus3.png');
		game.load.image('userShield', 'resources/assets/sprites/shield2.png');
		game.load.spritesheet('explosion', 'resources/assets/animations/explosion.png', 128, 128);
	};

	that.create = function ()
	{
		game.state.start('menu');
	};

	return that;
};
