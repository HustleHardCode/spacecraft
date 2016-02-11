'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var PreloadState = function (spec)
{
	var that = {};

	var game = spec.game;

	that.preload = function ()
	{
		game.load.image('redBeam', 'images/sprites/beam/redBeam.png');
		game.load.image('greenBeam', 'images/sprites/beam/greenBeam.png');
		game.load.image('starField', 'images/sprites/starField.png');
		game.load.image('spaceCraft', 'images/sprites/spaceCraft/spaceCraft.png');
		game.load.image('spaceCraft1', 'images/sprites/spaceCraft/spaceCraft1.png');
		game.load.image('spaceCraft2', 'images/sprites/spaceCraft/spaceCraft2.png');
		game.load.image('spaceCraft3', 'images/sprites/spaceCraft/spaceCraft3.png');
		game.load.image('bonus1', 'images/sprites/bonus/bonus1.png');
		game.load.image('bonus2', 'images/sprites/bonus/bonus2.png');
		game.load.image('bonus3', 'images/sprites/bonus/bonus3.png');
		game.load.image('shield', 'images/sprites/shield.png');
		game.load.image('meteor1', 'images/sprites/meteor/meteor1.png');
		game.load.image('meteor2', 'images/sprites/meteor/meteor2.png');
		game.load.image('meteor3', 'images/sprites/meteor/meteor3.png');
		game.load.image('meteor4', 'images/sprites/meteor/meteor4.png');
		game.load.image('meteor5', 'images/sprites/meteor/meteor5.png');
		game.load.image('meteor6', 'images/sprites/meteor/meteor6.png');
		game.load.image('meteor7', 'images/sprites/meteor/meteor7.png');
		game.load.image('userShield', 'images/sprites/shield2.png');
		game.load.atlasJSONHash('bots', 'images/animations/bots.png', 'images/animations/bots.json');
		game.load.spritesheet('explosion', 'images/animations/explosion.png', 128, 128);
	};

	that.create = function ()
	{
		game.state.start('menu');
	};

	return that;
};
