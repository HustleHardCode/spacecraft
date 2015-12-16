'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var PlayState = function (spec)
{
	var that = {};

	var game = spec.game;
	var scope = game.sc.scope;
	var sc = game.sc;

	var cursors;
	var isRunning;
	var userCode;
	var userObject;
	var toSpaceCraft;

	//===================================
	//============== HELP ===============
	//===================================

	function runUserScript()
	{
		if (isRunning)
		{
			try
			{
				userObject.run(SpaceCraftApi(scope.spaceCraft), WorldApi(sc.world, scope.spaceCraft.getId()));
				scope.editorParams.error = false;
			}
			catch (err)
			{
				scope.editorParams.error = err.toString();
				scope.editorParams.isCodeRunning = false;
			}
		}
	}

	function followFor(object)
	{
		game.camera.follow(object);
		game.camera.deadzone = new Phaser.Rectangle(200, 200, 300, 300);
		game.camera.focusOn(object);
	}

	function keysControl()
	{
		if (cursors.up.isDown)
		{
			game.camera.unfollow(scope.spaceCraft.sprite);
			game.camera.y -= 4;
		}
		else if (cursors.down.isDown)
		{
			game.camera.unfollow(scope.spaceCraft.sprite);
			game.camera.y += 4;
		}

		if (cursors.left.isDown)
		{
			game.camera.unfollow(scope.spaceCraft.sprite);
			game.camera.x -= 4;
		}
		else if (cursors.right.isDown)
		{
			game.camera.unfollow(scope.spaceCraft.sprite);
			game.camera.x += 4;
		}

		if (toSpaceCraft.isDown)
		{
			followFor(scope.spaceCraft.sprite);
		}
	}

	function gameInit(bounds)
	{
		game.add.tileSprite(bounds.x, bounds.y, bounds.width, bounds.height, 'starField');
		game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

		cursors = game.input.keyboard.createCursorKeys();
		toSpaceCraft = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		game.paused = true;
	}

	function entitiesInit()
	{
		var factory = sc.world.factory;

		// Создаем объект мира
		factory.createMeteors({count: 2});
		factory.createBots({
			count: 20,
			strategy: botStrategy,
			health: 200,
			shield: 100
		});

		scope.$apply(function createSpaceCraft()
		{
			scope.spaceCraft = factory.createSpaceCraft({
				x: game.world.centerX,
				y: game.world.centerY,
				spriteName: 'spaceCraft',
				health: 200,
				shield: 100,
				shieldSprite: 'userShield'
			});
		});

	}


	//===================================
	//============== CYCLE ==============
	//===================================

	that.create = function ()
	{
		gameInit(sc.world.getBounds());
		entitiesInit();
		followFor(scope.spaceCraft.sprite);


		scope.$watch('editorParams.code', function (n)
		{
			userCode = n;
		});

		scope.$watch('editorParams.isCodeRunning', function (n)
		{
			isRunning = n;

			if (game)
			{
				game.paused = !isRunning;
			}

			if (n)
			{
				try
				{
					userObject = new Function(userCode)();
				}
				catch (err)
				{
					scope.editorParams.error = err.toString();
					scope.editorParams.isCodeRunning = false;
				}
			}
		});
	};

	that.update = function ()
	{
		scope.$apply(function ()
		{
			if (!scope.spaceCraft.isAlive())
			{
				sc.callers.result(scope.spaceCraft.statistic);
				game.paused = true;
			}
		});

		if (!game.paused)
		{
			sc.world.update();
			runUserScript();
		}

		keysControl();
	};

	return that;
};
