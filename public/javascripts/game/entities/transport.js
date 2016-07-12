'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');
var BlocksFactory = require('./blocks');
var GameAudioFactory = require('../audio');

// Экспорт
module.exports = TransportUnit;

/**
 * Объект транспорта.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function TransportUnit(game, x, y, player) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createTransport(game, x, y);
	t.sprite.health = 10;
	t.sprite.maxHealth = 10;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            120,	// Торможение корабля
		velocity:        60,	// Скорость корабля
		angularVelocity: 0.5	// Скорость разворота
	});

	t.emmiterFire = game.add.emmiter(x, y, 400);

	t.emmiterFire.gravity = 200;
	t.emmiterFire.setAlpha(1, 0, 3000);
	t.emmiterFire.setScale(0.8, 0, 0.8, 0, 3000);

	t.emmiterFire.makeParticles(['fire1']);

	t.emmiterFire.start(false, 3000, 50);
	
	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t.sprite, player);

	t.update = update;

	return t;

	/**
	 * Обновление транспорта.
	 */
	function update() {

		t.engine.update();

		t.logic && t.logic(t);
		
		t.emmiterFire.x = t.sprite.x;
		t.emmiterFire.y = t.sprite.y;
	}

}
