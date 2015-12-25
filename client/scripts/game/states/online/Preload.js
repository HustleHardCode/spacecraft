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
		game.load.image('redBeam', 'resources/assets/sprites/beam/redBeam.png');
		game.load.image('greenBeam', 'resources/assets/sprites/beam/greenBeam.png');
		game.load.image('starField', 'resources/assets/sprites/starField.png');
		game.load.image('spaceCraft', 'resources/assets/sprites/spaceCraft/spaceCraft.png');
		game.load.image('spaceCraft1', 'resources/assets/sprites/spaceCraft/spaceCraft1.png');
		game.load.image('spaceCraft2', 'resources/assets/sprites/spaceCraft/spaceCraft2.png');
		game.load.image('spaceCraft3', 'resources/assets/sprites/spaceCraft/spaceCraft3.png');
		game.load.image('bonus1', 'resources/assets/sprites/bonus/bonus1.png');
		game.load.image('bonus2', 'resources/assets/sprites/bonus/bonus2.png');
		game.load.image('bonus3', 'resources/assets/sprites/bonus/bonus3.png');
		game.load.image('shield', 'resources/assets/sprites/shield.png');
		game.load.image('meteor1', 'resources/assets/sprites/meteor/meteor1.png');
		game.load.image('meteor2', 'resources/assets/sprites/meteor/meteor2.png');
		game.load.image('meteor3', 'resources/assets/sprites/meteor/meteor3.png');
		game.load.image('meteor4', 'resources/assets/sprites/meteor/meteor4.png');
		game.load.image('meteor5', 'resources/assets/sprites/meteor/meteor5.png');
		game.load.image('meteor6', 'resources/assets/sprites/meteor/meteor6.png');
		game.load.image('meteor7', 'resources/assets/sprites/meteor/meteor7.png');
		game.load.image('userShield', 'resources/assets/sprites/shield2.png');
		game.load.atlasJSONHash('bots', 'resources/assets/animations/bots.png', 'resources/assets/animations/bots.json');
		game.load.spritesheet('explosion', 'resources/assets/animations/explosion.png', 128, 128);
	};

	that.create = function ()
	{
		game.state.start('menu');
	};

	return that;
};
