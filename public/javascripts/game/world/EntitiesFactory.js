/**
 * Created by vladthelittleone on 02.12.15.
 */
var EntitiesFactory = function (spec)
{
	var that = {};

	var game = spec.game;
	var world = spec.world;
	var decorations = world.decorations;

	that.createMeteors = function (args)
	{
		for (var i = 0; i < args.count; i++)
		{
			decorations.push(Meteor({
				angle: game.rnd.angle(),
				x: game.world.randomX,
				y: game.world.randomY,
				scale: utils.randomInt(1, 3) * 0.25,
				spriteName: 'meteor' + utils.randomInt(1, 7),
				game: game
			}));
		}
	};


	that.createBots = function (args)
	{
		for (var i = 0; i < args.count; i++)
		{
			var modX = world.getBounds().height - 320;
			var modY = world.getBounds().width - 320;

			that.createSpaceCraft({
				strategy: args.strategy,
				x: game.world.randomX % modX + 200,
				y: game.world.randomY % modY + 200,
				spriteName: 'spaceCraft' + utils.randomInt(1, 3),
				health: args.health,
				angle: game.rnd.angle(),
				shield: args.shield
			});
		}
	};

	that.createBonus = function (args)
	{
		args.game = game;

		return Bonus(args);
	};

	that.createExplosion = function (args)
	{
		args.game = game;

		return game.sc.animationManager.explosion(args);
	};

	that.createSpaceCraft = function (args)
	{
		args.game = game;

		return SpaceCraft(args);
	};

	that.createGameObject = function (args)
	{
		args.game = game;

		return GameObject(args);
	};

	return that;
};
