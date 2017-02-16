'use strict';

/**
 * @author Ivan Makovchik
 * @since 13.07.16
 */
module.exports = Trail;

function Trail (game, spaceCraft, trailX, trailY, trailScale){

	var t = {};

	var sprite = spaceCraft.sprite;

	// Добавляем эммитеры
	t.emitter = game.add.emitter(0, 0, 10);
	t.emitter.makeParticles('trail');

	// Привязываем трейл к кораблю
	sprite.addChild(t.emitter);

	// Устанавливаем относительные координаты
	t.emitter.y = trailY || 0;
	t.emitter.x = - trailX || - sprite.width / 2;

	t.emitter.maxParticleScale = trailScale || 1;

	// Количество частиц
	t.emitter.lifespan = 100;

	// Скорость появления
	t.emitter.maxParticleSpeed = new Phaser.Point(-50,25);
	t.emitter.minParticleSpeed = new Phaser.Point(-100,-25);

	t.start = start;

	return t;

	function start() {

		t.emitter.emitParticle();

	}

}
