'use strict';

const World = require('../world');
const AnimationFactory = require('../../animations');

const GameAudioFactory = require('../../audio');
const Prefab = require('../prefab');

// Экспорт
module.exports = Mine;

/**
 * Мина.
 */
function Mine({
	game,
	preload = 'mine',
	x,
	y,
	scale = 0.1,
	damage = 2,
	distance = 100,
	speed = 100,
	faction = 0,
	group
}) {

	let t = Prefab({
		game,
		preload,
		x,
		y,
		scale,
		group
	});

	t.faction = faction;

	t.events.onKilled.add(onKillCallback, this);

	t.audio = GameAudioFactory(game, t, false);

	t.update = update;

	return t;

	function onKillCallback() {

		AnimationFactory.playExplosions([{
			x: t.x,
			y: t.y,
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

	function tryToKillTarget() {

		game.physics.arcade.moveToObject(t, t.target, speed);

		game.physics.arcade.overlap(t.target, t, overlapHandler);

	}

	function update() {

		if(!t.target) {

			let sprites = World.getObjects();

			for(let target of sprites) {

				if(Phaser.Point.distance(t, target) <= distance &&
				   target.faction != t.faction) {

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
