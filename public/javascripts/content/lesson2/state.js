'use strict';

// Зависимости
let EntitiesFactory = require('../../game/entities');
let CodeLauncher = require('../../game/launcher');

let Api = require('./api');

let MeteorFactory = EntitiesFactory.MeteorFactory;

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	let t = state;

	let player;		// Игрок
	let graphics;	// Графика
	let sensor;		// Датчик

	t.entities = entities;
	t.logic = logic;
	t.onContextLoaded = onContextLoaded;
	t.backgroundObjects = require('../backgrounds/сrash-zone');

	return t;

	/**
	 * Логика в конкретном подуроке.
	 */
	function onContextLoaded(game, {subIndex: index}) {

		if (index  > 0) {

			player.x = 2000;
			player.y = 2000;
			player.rotation = 0.5 * Math.PI / 2;

		}

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
		player = EntitiesFactory.createScout({
			game: game,
			x: 1000,
			y: 1000,
			player: true
		});

		player.rotation = -Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Создать метеоритное поле
		MeteorFactory.createMeteorField({game, x, y});

		let cruiser = EntitiesFactory.createCruiser({
			game: game,
			x: 2020,
			y: 1740
		});

		cruiser.rotation = -Math.PI / 2;

		// Дейстивя харвестра
		cruiser.logic = h => h.moveToXY(150, 150);

		let h1 = EntitiesFactory.createHarvester({game: game, x: 1859, y: 2156});

		h1.rotation = -3.35 * Math.PI / 2;

		let s1 = EntitiesFactory.createScout({game: game, x: 2055, y: 1995});
		let s2 = EntitiesFactory.createScout({game: game, x: 2101, y: 1890});

		s1.rotation = -3.85 * Math.PI / 2;
		s2.rotation = -4.25 * Math.PI / 2;

		patrol(s1, 2055, 1995, 2700, 1200);
		patrol(s2, 2101, 1890, 2800, 1340);

		sensor = EntitiesFactory.create({
			game: game,
			x: 2170,
			y: 2080,
			preload: 'sensor'
		});

		sensor.visible = false;
		sensor.bringToTop();

		// Корабль на верх.
		player.bringToTop();

		// Фокус на на центре
		t.followFor(player);

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

		// Если сканирование включено,
		// то появляется сдатчик.
		if (player.api.isScanningActivated()) {

			sensor.visible = true;

		}

	}
}
