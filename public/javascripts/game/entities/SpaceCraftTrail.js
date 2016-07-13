/**
 * Created by vaimer on 13.07.16.
 */

'use strict';

module.exports = SpaceCraftTrail;

function SpaceCraftTrail(game, x, y, sprite) {

	var t = {};

	t.emitterFire = game.add.emitter(x, y, 400);

	t.emitterFire.gravity = 200;
	t.emitterFire.setAlpha(1, 0, 3000);
	t.emitterFire.setScale(0.8, 0, 0.8, 0, 3000);

	t.emitterFire.setXSpeed(0, 0);
	t.emitterFire.setYSpeed(-80, -50);

	t.emitterFire.makeParticles(sprite);

	t.emitterFire.start(false, 3000, 50);

	return t;

	t.update = update;

	function update(x, y) {
		t.emitterFire.x = x;
		t.emitterFire.y = y;
	}
}
