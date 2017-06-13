'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var World = require('../../world');
var GameAudioFactory = require('../../../audio');
var AnimationFactory = require('../../../animations');

// Экспорт
module.exports = Mine;

/**
 * Объект мины.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function Mine({game, x, y, scale, group, damage, distance, speed}) {

	var t = {};

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
		sprite.damage(damage);

		mine.kill();

	}

	function update() {

		var sprites = World.getObjects();

		sprites.forEach(target => {

			if(Phaser.Point.distance(t, target) <= distance) {

				game.physics.arcade.moveToObject(t, target, speed);

				game.physics.arcade.overlap(target, t, overlapHandler);
			}
		});
	}
}
