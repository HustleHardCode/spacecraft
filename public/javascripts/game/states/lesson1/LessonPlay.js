'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var LessonPlayState = function (spec)
{
	var that = PlayState(spec);

	var game = spec.game;
	var scope = game.sc.scope;
	var sc = game.sc;

	that.entitiesInit = function ()
	{
		scope.$apply(function createSpaceCraft()
		{
			var factory = sc.world.factory;

			scope.spaceCraft = factory.createSpaceCraft({
				x: game.world.centerX,
				y: game.world.centerY,
				spriteName: 'spaceCraft',
				health: 200,
				shield: 100,
				shieldSprite: 'userShield'
			});
		});

	};

	return that;
};
