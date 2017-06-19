'use strict';

// Зависимости
let EntitiesFactory = require('../../game/entities');
let CodeLauncher = require('../../game/launcher');

let Api = require('./api');

let MeteorFactory = EntitiesFactory.MeteorFactory;
let MineFieldFactory = EntitiesFactory.MineFieldFactory;

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	let t = state;

	let player;		// Игрок

	t.entities = entities;
	t.backgroundObjects = require('../backgrounds/сrash-zone');

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		let x = game.world.centerX;
		let y = game.world.centerY;

		// Создать метеоритное поле
		MeteorFactory.createMeteorField({game, x, y});

		EntitiesFactory.createStructure({
			preload: 'researchCenter',
			game: game,
			x: 400,
			y: 2000
		});

		// Создать транспорт
		player = EntitiesFactory.createFlea({
			game: game,
			x: x,
			y: y,
			player: true
		});

		player.rotation = - Math.PI / 2;

		// API для урока
		player.api = Api(player);

		MineFieldFactory.createLightMineField({
			game: game,
			x: 1650,
			y: 1650
		});

		// Корабль на верх.
		player.bringToTop();

		// Фокус на на центре
		t.followFor(player);

		CodeLauncher.setArguments(player.api);

	}
}
