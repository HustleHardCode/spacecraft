'use strict';

const World = require('../world');

const distance = 100;
const damage = 2;
const speed = 100;

let mine =  {
	needAudio: true,
	preload: 'mine',
	scale: 0.1,
	damage: damage,
	distance: distance,
	speed: speed,
	faction: 0,
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
			},
		]
	},
	logic: logic
};

module.exports = mine;



function logic(mine, game) {

	if(!mine.target) {

		let sprites = World.getObjects();

		for(let target of sprites) {

			if(Phaser.Point.distance(mine, target) <= distance &&
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
	sprite.damage(damage);

	mine.kill();

}

function tryToKillTarget(game, mine) {

	game.physics.arcade.moveToObject(mine, mine.target, speed);

	game.physics.arcade.overlap(mine.target, mine, overlapHandler);

}
