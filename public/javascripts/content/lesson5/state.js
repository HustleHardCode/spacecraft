'use strict';

let EntitiesFactory = require('../../game/entities');
let CodeLauncher = require('../../game/launcher');

let Api = require('./api');

let MeteorFactory = EntitiesFactory.MeteorFactory;

module.exports = StateWrapper;

function StateWrapper(state) {

	// Дистанция при которой точка считается пройденной и необходимо лететь к следущеё точке
	const DISTANCE_TO_ACCEPT_POINT = 50;
	const DETECTION_RADIUS = 100;

	let t = state;

	// Объекты мира.
	let player;
	let enemy;

	// Координаты центра мира.
	let centerX;
	let centerY;

	// Индекс точки для корабля противника.
	let pointIndex1 = 0;
	let pointIndex2 = 0;
	let pointIndex3 = 0;

	t.entities = entities;
	t.onContextLoaded = onContextLoaded;
	t.backgroundObjects = require('../backgrounds/pirate-bay');

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		centerX = game.world.centerX;
		centerY = game.world.centerY;

		const pirateBase = EntitiesFactory.createStructure({
			preload: 'pirateBase',
			game: game,
			x: centerX + 750,
			y: centerY - 50,
			velocity: 30,
			scale: 0.3
		});

		// Создать транспорт противника
		enemy = EntitiesFactory.createHawk({
			game: game,
			x: centerX + 650,
			y: centerY - 50,
			velocity: 30
		});

		enemy.bringToTop();

		enemy.angle = 220;
		enemy.logic = enemyMoving;

		// Создаем транспоты 1 и 2
		let transport = EntitiesFactory.createLouse({
			game: game,
			x: centerX + 800,
			y: centerY - 800,
			velocity: 30
		});

		transport.logic = transport1Moving;

		let transport2 = EntitiesFactory.createLouse({
			game: game,
			x: centerX + 650,
			y: centerY + 300,
			velocity: 30
		});

		transport2.logic = transport2Moving;

		// cоздаем метеоритное поле
		MeteorFactory.createMeteorsByFunction({
			game: game,
			calculateMeteorCoordinateY: calculateMeteorCoordinateY,
			startX: centerX - 1000,
			finishX: centerX + 2000,
			step: 60,
			count: 3,
			radius: 200
		});

		createPlayer(game);

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
	 * Метод логики врага для 9 подурока.
	 * Враг просто курсирует по заданным точкам
	 */
	function enemyMoving(obj) {

		let points = [new Phaser.Point(centerX - 500, centerY - 500),
			          new Phaser.Point(centerX - 500, centerY - 1000),
		              new Phaser.Point(centerX - 1500, centerY - 1000),
			          new Phaser.Point(centerX - 1500, centerY - 500)];

		pointIndex1 = moveToNextPoint(obj, points, pointIndex1);

	}

	/**
	 * Метод логики курсирования для первого транспорта.
	 */
	function transport1Moving(obj) {

		let points = [new Phaser.Point(centerX + 650, centerY - 50), new Phaser.Point(centerX + 800, centerY - 800)];

		pointIndex2 = moveToNextPoint(obj, points, pointIndex2);

	}

	/**
	 * Метод логики курсирования для второго транспорта.
	 */
	function transport2Moving(obj) {

		let points = [new Phaser.Point(centerX + 650, centerY - 50), new Phaser.Point(centerX + 650, centerY + 300)];

		pointIndex3 = moveToNextPoint(obj, points, pointIndex3);

	}

	function moveToNextPoint(obj, points, pointIndex) {

		if (obj.distanceTo(points[pointIndex].x, points[pointIndex].y) < DISTANCE_TO_ACCEPT_POINT) {

			pointIndex++;

			if (pointIndex >= points.length) {

				pointIndex = 0;

			}

		} else {

			obj.moveToXY(points[pointIndex].x, points[pointIndex].y);

		}

		return pointIndex;

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
