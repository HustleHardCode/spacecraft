'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 13.06.17
 */

const PrefabsFactory = require('../../prefabs');
const BlocksFactory = require('../../blocks');

module.exports = PirateBaseUnit;

function PirateBaseUnit({game, x, y, faction}) {

	let t = {};

	t = PrefabsFactory.createBase({
		game: game,
		x: x,
		y: y,
		preload: 'pirateBase',
		faction: faction,
		scale: 0.3
	});

	t.engine = BlocksFactory.addEngineBlock({
		game: game,
		unit: t,
		drag: 0,
		velocity: 0,
		angularVelocity: 0.0010,
		trail: false
	});

	t.update = t.rotateLeft;

	return t;
}
