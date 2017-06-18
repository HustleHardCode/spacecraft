'use strict';

/**
 * @author Ivan Makovchik
 * @since 13.07.16
 */
module.exports = Trail;

function Trail ({
	game,
	unit,
	preload,
	scale,
	maxParticleSpeedX = -50,
	maxParticleSpeedY = 0,
	minParticleSpeedX = -60,
	minParticleSpeedY = 0,
	rotationX = 0,
	rotationY = 0,
	lifespan = 100,
	count = 5
}) {

	var t = {};

	// Добавляем эммитеры
	t.emitter = game.add.emitter(-unit.width / 2, 0, count);
	t.emitter.makeParticles(preload);

	// Привязываем трейл к кораблю
	unit.addChildAt(t.emitter, 0);

	// Устанавливаем относительные координаты
	t.emitter.lifespan = lifespan;
	t.emitter.maxParticleSpeed = new Phaser.Point(maxParticleSpeedX, maxParticleSpeedY);
	t.emitter.minParticleSpeed = new Phaser.Point(minParticleSpeedX, minParticleSpeedY);
	t.emitter.setRotation(rotationX, rotationY);

	t.emitter.maxParticleScale = scale || 1;

	t.start = start;

	return t;

	function start() {

		t.emitter.emitParticle();

	}

}
