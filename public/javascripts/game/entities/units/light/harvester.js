'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');

// Экспорт
module.exports = HarvesterUnit;

/**
 * Объект харвестра.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function HarvesterUnit({game, x, y, player}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t = PrefabsFactory.createCustomUnit({
		game:    game,
		x:       x,
		y:       y,
		preload: 'harvester'
	});

	t.health = 20;
	t.maxHealth = 20;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            30,	// Торможение корабля
		velocity:        20,	// Скорость корабля
		angularVelocity: 0.2,	// Скорость разворота
		trails:          [{
			trailX:     3,
			trailScale: 0.5
		}]
	});

	/**
	 * Добавляем щиты.
	 */
	t.shield = BlocksFactory.addShieldBlock({
		game:  game,
		unit:  t,
		scale: 0.4
	});

	/**
	 * Грузовой блок.
	 */
	t.cargo = BlocksFactory.addCargoBlock({
		unit: t
	});

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t, player);

	t.update = update;

	return t;

	/**
	 * Обновление харвестра.
	 */
	function update() {

		t.engine.update();

		t.logic && t.logic(t);

	}

}