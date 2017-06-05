'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');

var Api = require('./api');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	var t = state;

	t.entities = entities;

	// Границы
	t.bounds = {
		x:      0,
		y:      0,
		width:  2000,
		height: 2000
	};

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var bounds = game.world.bounds;
		var height = bounds.height;
		var width = bounds.width;

		EntitiesFactory.createBase({
			game: game,
			x: height - 300,
			y: 300,
			preload: 'combatBase',
			faction: 1
		});

		EntitiesFactory.createBase({
			game: game,
			x: 300,
			y: width - 300,
			preload: 'combatBase',
			faction: 2
		});

		// Создать корабль игрока
		var player = EntitiesFactory.createCombat({
			game: game,
			x: 1000,
			y: 1000,
			player: true,
			faction: 1,
			preload: 'combat1'
		});

		// Создать корабль игрока
		EntitiesFactory.createCombat({
			game: game,
			x: 1000,
			y: 900,
			faction: 2,
			preload: 'combat1'
		});

		var sprite = player.sprite;

		sprite.rotation = -Math.PI / 2;

		// API для урока
		player.api = Api(player);
		player.sprite.bringToTop();

		// Фокус на базе
		t.followFor(player.sprite);

		CodeLauncher.setArguments(player.api);
	}
}
