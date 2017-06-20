'use strict';

let EntitiesFactory = require('../../game/entities');
let CodeLauncher = require('../../game/launcher');

let Api = require('./api');

let MeteorFactory = EntitiesFactory.MeteorFactory;

module.exports = StateWrapper;

function StateWrapper(state) {

	const DETECTION_RADIUS = 100;

	let t = state;

	// Объекты мира.
	let player;
	let enemy;

	// Координаты центра мира.
	let centerX;
	let centerY;

	t.entities = entities;
	t.onContextLoaded = onContextLoaded;
	t.backgroundObjects = require('../backgrounds/pirate-bay');

	return t;

	/**
	 * Шаблонный метод инициализации объектов.
	 */
	function entities(game) {

		centerX = game.world.centerX;
		centerY = game.world.centerY;

		createScene(game);
		createOtherShip(game);
		createEnemy(game);

		createPlayer(game);

	}

	/**
	 * Функция создает условно статические объект сцены.
	 * Такие как метеоритное поле и база пиратов.
	 */
	function createScene(game) {

		// cоздаем метеоритное поле
		MeteorFactory.createMeteorsByFunction({
			game: game,
			calculateMeteorCoordinateY: calculateMeteorCoordinateY,
			startX: centerX - 1000,
			finishX: centerX + 2000,
			step: 60,
			count: 8,
			radius: 200
		});

		EntitiesFactory.createStructure({
			preload: 'pirateBase',
			game: game,
			x: centerX + 750,
			y: centerY - 50,
			velocity: 30,
			scale: 0.3
		});

	}

	/**
	 * Функция создает корабль противника, и задает ему
	 * стратегию перемещения по определенным точкам.
	 */
	function createEnemy(game) {

		// Создать транспорт противника
		enemy = EntitiesFactory.createHawk({
			game: game,
			x: centerX + 650,
			y: centerY - 50,
			velocity: 30
		});

		enemy.bringToTop();
		enemy.angle = 220;

		let points = [new Phaser.Point(centerX - 500, centerY - 500),
			          new Phaser.Point(centerX - 500, centerY - 1000),
			          new Phaser.Point(centerX - 1500, centerY - 1000),
			          new Phaser.Point(centerX - 1500, centerY - 500)];

		enemy.patrol(points);

	}

	/**
	 * Данная функция, определяет, то как должна изменятся значение координаты y, в
	 * зависимости от значения координаты x, при ортрисовке метеоритного поля.
	 */
	function calculateMeteorCoordinateY(x) {

		if(x < centerX + 600) {

			return centerX + 400;

		}

		if(x < centerX + 1100) {

			return centerY + 300;

		}

		if (x < centerX + 1250) {

			return centerY + 200;
		}


		return centerY - (x / 10 - 100);
	}

	/**
	 * Функция создает корабли, которые просто участвует
	 * в сцене для иллюзии бурной жизни вокруг станции.
	 * Корабли перемещаються по определеным точкам.
	 */
	function createOtherShip(game) {

		// Создаем транспоты 1 и 2
		let transport1 = EntitiesFactory.createMantis({
			game: game,
			x: centerX + 800,
			y: centerY - 800,
			velocity: 30
		});

		let points1 = [new Phaser.Point(centerX + 650, centerY - 50), new Phaser.Point(centerX + 800, centerY - 800)];

		transport1.patrol(points1);

		let transport2 = EntitiesFactory.createLouse({
			game: game,
			x: centerX + 650,
			y: centerY + 300,
			velocity: 30
		});

		let points2 = [new Phaser.Point(centerX + 650, centerY - 50), new Phaser.Point(centerX + 800, centerY - 800)];

		transport2.patrol(points2);

		let transport3 = EntitiesFactory.createScout({
			game: game,
			x: centerX + 650,
			y: centerY - 50,
			velocity: 30
		});

		let points3 = [new Phaser.Point(centerX - 1000, centerY), new Phaser.Point(centerX + 650, centerY - 50)];

		transport3.patrol(points3);

	}

	// Метод логики корабля пользователя для 9 подурока.
	function moveToEnemy (obj) {

		// Объект в зоне поражения EMP?
		let inDetectionRadius = player.distanceTo(enemy.x, enemy.y) < DETECTION_RADIUS;

		// Всегда следуем за enemy
		obj.moveToXY(enemy.x, enemy.y);

		// Отрисовка кружочка EMI в зависимости от включенности и расстояния до enemy
		if (player.isEmpActivated) {

			if (inDetectionRadius) {

				// Останавливаем объекты
				player.logic = undefined;
				enemy.logic = undefined;

				player.isCaught = true;

			} else {

				player.stun();

			}

		} else if (inDetectionRadius) {

			player.stun();

		}
	}


	/**
	 * Создание корабля игрока.
	 *
	 * @param game игровой объект.
	 */
	function createPlayer(game) {

		// Создать транспорт игрока
		player = EntitiesFactory.createFlea({
			game:     game,
			x:        centerX,
			y:        centerY,
			player:   true,
			velocity: 20
		});

		// Добавляем щиты.
		player.addBlock({
			"type": "shieldBlock",
			"scale": 0.6
		});

		player.bringToTop();

		player.angle = 270;
		player.alpha = 0;

		player.isEmpActivated = false;

		// API для урока
		player.api = Api(player, enemy);

		CodeLauncher.setArguments(player.api);

		t.followFor(player);

	}

	/**
	 * Логика в конкретном подуроке.
	 */
	function onContextLoaded(game, {subIndex: index}) {

		if (index === 8) {

			let warpTimer = game.time.create(true);
			warpTimer.add(3000, onTimerSignal, this);
			warpTimer.start();

		}

	}

	function onTimerSignal() {

		player.warp();
		player.logic = moveToEnemy;

	}

}
