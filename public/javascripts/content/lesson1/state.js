'use strict';

// Зависимости
let EntitiesFactory = require('../../game/entities');
let CodeLauncher = require('../../game/launcher');
let Random = require('../../utils/random');

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

	let explosions;	// Группа анимации взрывов
	let player;		// Игрок
	let mines; 		// Мины

	let mineXY;		// Координаты мин

	t.entities = entities;
	t.logic = logic;
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
		mineXY = new Phaser.Point(1600, 1600);

		// Создаем группу из мин
		mines = game.add.group();

		for (let i = 0; i < 10; i++)
		{
			let deltaY = Random.randomOf(-1, 1) * 20 * i;
			let deltaX = Random.randomOf(-1, 1) * 20 * i;

			EntitiesFactory.create({
				game: game,
				preload: 'mine',
				x: mineXY.x + deltaX,
				y: mineXY.y - deltaY,
				scale: 0.08,
				group: mines
			});
		}

		// Группа анимации взрыва
		explosions = game.add.group();
		explosions.createMultiple(10, 'explosion');
		explosions.forEach(initExplosion, this);

	}

	/**
	 * Инициализация взрывов.
     */
	function initExplosion (explosion) {

		explosion.anchor.x = 0.5;
		explosion.anchor.y = 0.5;
		explosion.animations.add('explosion');

	}

	/**
	 * Обновление логики минного поля.
     */
	function logic(game) {

		// В случае близкого положения мин,
		// летим к кораблю
		if (Phaser.Point.distance(mineXY, player) < 100) {

			mines.forEach(function (e) {

				if (!player.alive) {

					// Если игрок погиб, мины
					// прекращают движение.
					e.body.velocity.x = 0;
					e.body.velocity.y = 0;

				} else {

					game.physics.arcade.moveToObject(e, player, 100);

					// При пересечении обрабатываем в overlapHandler
					game.physics.arcade.overlap(player, e, overlapHandler);

				}

			});

		}

	}

	/**
	 * Обработка пересечений.
	 */
	function overlapHandler(transport, mine) {

		// Наносим два урона
		transport.damage(2);

		let explosion = explosions.getFirstExists(false);

		explosion.scale.setTo(0.5);
		explosion.reset(transport.body.x, transport.body.y);
		explosion.play('explosion', 30, false, true);

		player.audio.playExplosion();

		mine.kill();

	}

}
