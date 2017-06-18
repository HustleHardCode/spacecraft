'use strict';

const lodash = require('lodash');
const World = require('../../world');
const Unit = require('../unit');

// Экспорт
module.exports = Mine;

/**
 * Created by vaimer on 18.06.2017.
 */

function Mine(args) {

	let {
		game, 					// Игровой объект
		needAudio,
		scale,
		damage,
		distance,
		speed,
		killOptions
	}          = args;

	let t = Unit(args);

	t.target = {};

	t.update = update;

	return t;

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

		if(lodash.isEmpty(t.target)) {

			let sprites = World.getObjects();

			for(let target of sprites) {

				if(Phaser.Point.distance(t, target) <= distance) {

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
