'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');
var BlocksFactory = require('./blocks');
var GameAudioFactory = require('../audio');

// Экспорт
module.exports = ScoutUnit;

/**
 * Объект разведчика.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function ScoutUnit(game, x, y, player) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createScout(game, x, y);
	t.sprite.health = 4;
	t.sprite.maxHealth = 4;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            150,	// Торможение корабля
		velocity:        80,	// Скорость корабля
		angularVelocity: 0.8,	// Скорость разворота
		trailScale:      0.05,
		trail:           true				// Использование огня двигателя
	});

	t.scanner = BlocksFactory.addScannerBlock({
		game:        game,
		unit:        t,
		maxDiameter: 350
	});

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
		t.scanner.update();

		t.logic && t.logic(t);

	}

}
