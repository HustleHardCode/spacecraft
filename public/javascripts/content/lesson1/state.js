'use strict';

// Зависимости
var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var Random = require('../../utils/random');

var Api = require('./api');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	var t = state;

	var player;		// Игрок
	var mines; 		// Мины

	var mineXY;		// Координаты мин

	t.entities = entities;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		EntitiesFactory.createResearchCenter({
			game: game,
			x: 400,
			y: 2000
		});

		// Создать транспорт
		player = EntitiesFactory.createTransport({
			game: game,
			x: x,
			y: y,
			player: true
		});

		player.rotation = - Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Создать метеоритное поле
		EntitiesFactory.createMeteorField({game, x, y});

		mineField(game);

		// Корабль на верх.
		player.bringToTop();

		// Фокус на на центре
		t.followFor(player);

		CodeLauncher.setArguments(player.api);

	}

	/**
	 * Создание минного поля.
     */
	function mineField(game) {

		// Создать минное поле
		mineXY = new Phaser.Point(1550, 1550);

		// Создаем группу из мин
		mines = game.add.group();

		for (let i = 0; i < 10; i++) {

			for(let j = 0; j < 10; j++) {

				let deltaY = 20 * i * (i % 2);
				let deltaX = 20 * j * (j % 2);

				EntitiesFactory.createMine({
					game: game,
					x: mineXY.x + deltaX,
					y: mineXY.y + deltaY,
					scale: 0.15,
					group: mines,
					damage: 2,
					distance: 100,
					speed: 100
				});
			}
		}
	}

}
