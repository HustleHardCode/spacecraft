'use strict';

let EntitiesFactory = require('../../game/entities');
let CodeLauncher = require('../../game/launcher');

let Api = require('./api');

let MeteorFactory = EntitiesFactory.MeteorFactory;

module.exports = StateWrapper;

/**
 * Created by vaimer on 31.01.17.
 */

function StateWrapper(state) {

	let t = state;

	let player;
	let graphics;	// Графика
	let sensor;		// Датчик

	t.entities = entities;
	t.logic = logic;
	t.onContextLoaded = onContextLoaded;
	t.backgroundObjects = require('../backgrounds/сrash-zone');

	return t;

	function changePlayerCoordinates() {

		player.x = 400;
		player.y = 2000;
		player.rotation = 0.5 * Math.PI / 2;

	}

	function createNewCruiser(game) {

		let cruiser = EntitiesFactory.createCruiser({game: game, x: 1000, y: 2000});

		cruiser.rotation = -Math.PI / 2;

		cruiser.logic = cruiser.moveToXY.bind(cruiser, 3020, 3500);

	}

	/**
	 * Логика в конкретном подуроке.
	 */
	function onContextLoaded(game, {subIndex: index}) {

		if (index > 4) {

			sensor.visible = false;

		}

		if(index > 5) {

			changePlayerCoordinates();

		}
	}

	function createSpaceCraftsInWorld(game) {

		let scout = EntitiesFactory.createScout({game: game, x: 2000, y: 2000});
		scout.rotation = 0.5 * Math.PI / 2;

		let s1 = EntitiesFactory.createScout({game: game, x: 2055, y: 1995});
		let s2 = EntitiesFactory.createScout({game: game, x: 2101, y: 1890});
		let fighter = EntitiesFactory.createFighter({game: game, x: 400, y: 150});

		s1.rotation = -3.85 * Math.PI / 2;
		s2.rotation = -4.25 * Math.PI / 2;

		patrol(s1, 2055, 1995, 2700, 1200);
		patrol(s2, 2101, 1890, 2800, 1340);
		patrol(fighter, 400, 150, 400, 3000);
	}

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		let x = game.world.centerX;
		let y = game.world.centerY;

		// Инициализация графики
		graphics = game.add.graphics(0, 0);

		EntitiesFactory.createStructure({
			preload: 'researchCenter',
			game: game,
			x: 400,
			y: 2000
		});

		// Создать транспорт
		player = EntitiesFactory.createHarvester({
			game: game,
			x: 1859,
			y: 2156,
			player: true
		});

		player.rotation = -3.35 * Math.PI / 2;

		// API для урока
		player.api = Api(player);

		createNewCruiser(game);

		// Создать метеоритное поле
		MeteorFactory.createMeteorField({game, x, y});

		createSpaceCraftsInWorld(game);

		sensor = EntitiesFactory.create({
			game: game,
			x: 2170,
			y: 2080,
			preload: 'sensor'
		});

		sensor.visible = true;
		sensor.bringToTop();

		// Фокус на на центре
		t.followFor(player);

		// Корабль на верх.
		player.bringToTop();

		CodeLauncher.setArguments(player.api);
	}

	/**
	 * Патрулирование местности
	 * @param spacecraft корабль
	 * @param x1 координата x первой точки
	 * @param y1 координата y первой точки
	 * @param x2 координата x второй точки
	 * @param y2 координата y второй точки
	 */
	function patrol(spacecraft, x1, y1, x2, y2) {

		let x = x1;
		let y = y1;

		spacecraft.logic = function (h) {

			h.moveToXY(x, y);

			if (spacecraft.distanceTo(x1, y1) < 100) {

				x = x2;
				y = y2;

			}

			if (spacecraft.distanceTo(x2, y2) < 100) {

				x = x1;
				y = y1;

			}

		}

	}

	/**
	 * Обновление логики датчика.
	 */
	function logic() {

		if (player.api.isCargoLoad() &&
			player.api.isNearPoint(2170, 2080)) {

			sensor.visible = false;

		}

	}
}
