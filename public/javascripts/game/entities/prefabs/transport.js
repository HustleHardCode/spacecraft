'use strict';

module.exports = Transport;

/**
 * Prefab транспорта.
 *
 * Created by vladthelittleone on 11.06.16.
 */
function Transport(game, x, y) {

	var t = game.add.sprite(x, y, 'transport');

	// t.emmiterFire = game.add.emmiter(x, y, 400);
    //
	// t.emmiterFire.gravity = 200;
	// t.emmiterFire.setAlpha(1, 0, 3000);
	// t.emmiterFire.setScale(0.8, 0, 0.8, 0, 3000);
    //
	// t.emmiterFire.makeParticles(['fire1']);
    //
	// t.emmiterFire.start(false, 3000, 50);

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	t.body.collideWorldBounds = true;

	return t;

}
