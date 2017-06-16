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
	let pointIndex = 0;

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

		// Создать транспорт противника
		enemy = EntitiesFactory.createEbonHawk({
			game: game,
			x: centerX + 50,
			y: centerY - 200,
			velocity: 30
		});

		enemy.angle = 220;
		enemy.logic = enemyMoving;

		createMeteorField(game);
		createPlayer(game);

	}

	/**
	 * Создаем метеоритное поле по краям.
	 * @param game
	 */
	function createMeteorField(game) {

		MeteorFactory.createMeteorSphere({game: game, x: centerX - 750, y: centerY + 275, radius: 500});
		MeteorFactory.createMeteorSphere({game: game, x: centerX - 750, y: centerY - 1650, radius: 500});

		MeteorFactory.createMeteorSphere({game: game, x: centerX - 1250, y: centerY - 1650, radius: 500});
		MeteorFactory.createMeteorSphere({game: game, x: centerX - 1600, y: centerY + 200, radius: 500});

		MeteorFactory.createMeteorSphere({game: game, x: centerX - 2100, y: centerY - 900, radius: 500});

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

		} else {

			if (inDetectionRadius) {

				player.stun();

			}

		}

	}

	// Методо лигики врага для 9 подурока.
	// Враг просто курсирует по заданным точкам
	function enemyMoving (obj) {

		let x = [centerX - 500, centerX - 500,  centerX - 1500, centerX - 1500];
		let y = [centerY - 500, centerY - 1000, centerY - 1000, centerY - 500];

		if (obj.distanceTo(x[pointIndex], y[pointIndex]) < DISTANCE_TO_ACCEPT_POINT) {

			if (pointIndex === x.length - 1) {

				pointIndex = 0;

			} else {

				pointIndex++;

			}

		}

		obj.moveToXY(x[pointIndex], y[pointIndex]);

	}

	/**
	 * Создание корабля игрока.
	 *
	 * @param game игровой объект.
	 */
	function createPlayer(game) {

		// Создать транспорт игрока
		player = EntitiesFactory.createLightCorvette({
			game:     game,
			x:        centerX,
			y:        centerY,
			player:   true,
			velocity: 20
		});

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
