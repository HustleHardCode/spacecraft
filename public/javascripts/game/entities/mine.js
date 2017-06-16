'use strict';

// Зависимости
let Prefabs = require('./prefab');
let World = require('./world');
let GameAudioFactory = require('../audio');
let AnimationFactory = require('../animations');

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

	let game = {};

	t.createMineField = createMineField;

	return t;

	/**
	 * Создание минного поля.
	 */
	function createMineField(game, x, y) {

		this.game = game;

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

					let m = Prefabs({
						game: game,
						preload: 'mine',
						x: 	 mineXY.x + deltaX,
						y: 	 mineXY.y + deltaY,
						group: mines,
						scale: 0.15
					});

					World.pushObject(m);

					addMineLogic(m, game);

				}

			}
		}
	}

	function addMineLogic(mine, game) {

		mine.events.onKilled.add(onKillCallback, mine);

		mine.audio = GameAudioFactory(game, mine);

		mine.update = update;
	}

	/**
	 * Логика уничтожения корабля.
	 */
	function onKillCallback() {

		var x = this.x;
		var y = this.y;

		AnimationFactory.playExplosions([{
			x: x,
			y: y,
			scale: 0.2
		}]);

		// Удаляем объект из мира.
		World.removeObject();

		// Играем аудио взрыва.
		this.audio.playExplosion();
	}

	/**
	 * Обработка пересечений.
	 */
	function overlapHandler(sprite, mine) {

		// Наносим два урона
		sprite.damage(DAMAGE_MINE);

		mine.kill();

	}

	function update() {

		var sprites = World.getObjects();

		sprites.forEach(target => {

			if(Phaser.Point.distance(t, target) <= DISTANCE_TO_TARGET) {

				game.physics.arcade.moveToObject(t, target, MINE_SPEED);

				game.physics.arcade.overlap(target, t, overlapHandler);
			}
		});
	}
}
