'use strict';

const World = require('../world');

const DISTANCE = 100;
const DAMAGE = 10;
const SPEED = 100;

let mine =  {
	needAudio:   true,
	preload:     'mine',
	scale:       0.1,
	damage:      DAMAGE,
	distance:    DISTANCE,
	speed:       SPEED,
	faction:     0,
	killOptions: {
		explosion: [
			{
				offsetX:     [
					0,
					0
				],
				offsetY:     [
					0,
					0
				],
				randomScale: 0.2
			}
		]
	},
	logic:       logic
};

module.exports = mine;



function logic(mine, game) {

	if(!mine.target) {

		let sprites = World.getObjects();

		for(let target of sprites) {

			if(Phaser.Point.distance(mine, target) <= DISTANCE &&
			   target.faction !== mine.faction) {

				mine.target = target;

				tryToKillTarget(game, mine);

				break;
			}
		}

	} else {

		tryToKillTarget(game, mine);

	}

}

/**
 * Обработка пересечений.
 */
function overlapHandler(sprite, mine) {

	// Наносим урон
	sprite.damage(DAMAGE);

	mine.kill();

}

function tryToKillTarget(game, mine) {

	if (mine.target.alive) {

		game.physics.arcade.moveToObject(mine, mine.target, SPEED);

		game.physics.arcade.overlap(mine.target, mine, overlapHandler);

	}

}
