'use strict';

// Зависимости
let EntitiesFactory = require('../../game/entities');
let CodeLauncher = require('../../game/launcher');
let Random = require('../../utils/random');

let Api = require('./api');

let MeteorFactory = EntitiesFactory.MeteorFactory;
let MineFactory = EntitiesFactory.MineFactory;

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

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		let x = game.world.centerX;
		let y = game.world.centerY;

		EntitiesFactory.createStructure({
			preload: 'researchCenter',
			game:    game,
			x:       400,
			y:       2000
		});

		// Создать транспорт
		player = EntitiesFactory.createTransport({
			game:   game,
			x:      x,
			y:      y,
			player: true
		});

		player.rotation = -Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Создать метеоритное поле
		MeteorFactory.createMeteorField({game, x, y});

		MineFactory.createMineField(game, 1500, 1500);

		// Корабль на верх.
		player.bringToTop();

		// Фокус на на центре
		t.followFor(player);

		CodeLauncher.setArguments(player.api);

	}
}
