'use strict';

// Зависимости
let PrefabsFactory = require('../../prefabs');
let World = require('../../world');
let GameAudioFactory = require('../../../audio');
let AnimationFactory = require('../../../animations');

let lodash = require('lodash');

// Экспорт
module.exports = Mine;

/**
 * Объект мины.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function Mine({game, x, y, scale, group, damage, distance, speed}) {

	let t = {};

	t.target = {};

	/**
	 * Создаем спрайт.
	 */
	t = PrefabsFactory.createMine(game, x, y, scale, group);

	t.events.onKilled.add(onKillCallback, this);

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t);

	t.update = update;

	return t;

	/**
	 * Логика уничтожения корабля.
	 */
	function onKillCallback() {

		var x = t.x;
		var y = t.y;

		AnimationFactory.playExplosions([{
		   x: x,
		   y: y,
		   scale: 0.2
		}]);

		// Удаляем объект из мира.
		World.removeObject(t);

		// Играем аудио взрыва.
		t.audio.playExplosion();
	}

	/**
	 * Обработка пересечений.
	 */
	function overlapHandler(sprite, mine) {

		// Наносим два урона
		sprite && sprite.damage(damage);

		mine && mine.kill();

	}

	function tryToKillTarget() {

		game.physics.arcade.moveToObject(t, t.target, speed);

		game.physics.arcade.overlap(t.target, t, overlapHandler);

	}

	function update() {

		if(lodash.isEmpty(t.target)) {

			let sprites = World.getObjects();

			for(let target of sprites) {

				if(Phaser.Point.distance(t, target) <= distance) {

					// Определяем цель для мины,
					// первая найденная в зоне видимости
					t.target = target;

					tryToKillTarget();

					break;
				}
			}

		} else {

			tryToKillTarget();

		}
	}
}
