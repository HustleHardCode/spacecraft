'use strict';

// Зависимости
let Prefabs = require('./prefab');
let World = require('./world');
let GameAudioFactory = require('../audio');
let AnimationFactory = require('../animations');

let lodash = require('lodash');

// Экспорт
module.exports = MineFactory();

/**
 * Created by vaimer on 16.06.17.
 */
function MineFactory() {

	const DAMAGE_MINE = 2;
	const DISTANCE_TO_TARGET = 100;
	const MINE_SPEED = 100;

	let t = {};

	t.createMineField = createMineField;

	return t;

	/**
	 * Создание минного поля.
	 */
	function createMineField(game, x, y) {

		// Создать минное поле
		let mineXY = new Phaser.Point(x, y);

		// Создаем группу из мин
		let mines = game.add.group();

		// Создаем поле мин в шахматном порядке
		for (let i = 0; i < 10; i++) {

			for (let j = 0; j < 10; j++) {

				// Складываем индексы и мод 2,
				// 0 и 1 в таком случае будут чередоваться
				if ((i + j) % 2 === 0) {

					let deltaY = 20 * i;
					let deltaX = 20 * j;

					createMine({
						game: game,
						x: mineXY.x + deltaX,
						y: mineXY.y + deltaY,
						group: mines
					});

				}

			}
		}
	}

	function createMine({game, x, y, group}) {

		let mine = {};

		mine.target = {};

		mine = Prefabs({
			game: game,
			preload: 'mine',
			x: 	 x,
			y: 	 y,
			group: group,
			scale: 0.15
		});

		mine.events.onKilled.add(onKillCallback, mine);

		mine.audio = GameAudioFactory(game, mine);

		mine.update = update;

		return mine;

		/**
		 * Логика уничтожения корабля.
		 */
		function onKillCallback() {

			var x = mine.x;
			var y = mine.y;

			AnimationFactory.playExplosions([{
				x: x,
				y: y,
				scale: 0.2
			}]);

			// Удаляем объект из мира.
			World.removeObject(mine);

			// Играем аудио взрыва.
			mine.audio.playExplosion();
		}

		/**
		 * Обработка пересечений.
		 */
		function overlapHandler(sprite, mine) {

			// Наносим два урона
			sprite.damage(DAMAGE_MINE);

			mine.kill();

		}

		function tryToKillTarget() {

			game.physics.arcade.moveToObject(mine, mine.target, MINE_SPEED);

			game.physics.arcade.overlap(mine.target, mine, overlapHandler);

		}

		function update() {

			if(lodash.isEmpty(mine.target)) {

				let sprites = World.getObjects();

				for(let target of sprites) {

					if(Phaser.Point.distance(mine, target) <= DISTANCE_TO_TARGET) {

						mine.target = target;

						tryToKillTarget();

						break;
					}
				}

			} else {

				tryToKillTarget();

			}
		}
	}
}
