'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var BootState = function (spec)
{
	var that = {};

	var game = spec.game;

	function collisionInit()
	{
		game.sc.collisionGroups.spaceCraft = game.physics.p2.createCollisionGroup();
		game.sc.collisionGroups.bonus = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();
	}

	that.create = function ()
	{
		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;

		//  Enable P2
		game.physics.startSystem(Phaser.Physics.P2JS);

		//  Turn on impact events for the world, without this we get no collision callbacks
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.restitution = 0.8;

		game.sc.animationManager = new AnimationManager({
			game: game
		});

		collisionInit();

		game.sc.world = World({
			game: game,
			bounds: {
				x: 0,
				y: 0,
				height: 1920,
				width: 1920
			}
		});

		// Calling the load state
		game.state.start('preload');
	};

	return that;
};
