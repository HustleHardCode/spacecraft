'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');


// Экспорт
module.exports = CarrierUnit;

/**
 * Объект крейсера
 *
 * Created by vaimer on 09.05.2017.
 */

function CarrierUnit({game, factory, x, y, player, faction}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t = PrefabsFactory.createCustomUnit({
		game:    game,
		x:       x,
		y:       y,
		preload: 'carrier',
		faction: faction
	});

	t.health = 200;
	t.maxHealth = 400;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            300,				// Торможение корабля
		velocity:        15,			// Скорость корабля
		angularVelocity: 0.05,	// Скорость разворота
	});

	/**
	 * Добавляем щиты.
	 */
	t.shield = BlocksFactory.addShieldBlock({
		game:  game,
		unit:  t,
		scale: 2.8
	});

	/**
	 * Добавляем блок создания объектов.
	 */
	t.carrier = BlocksFactory.addCarrierBlock({
		factory: factory,
		game:    game,
		unit:    t,
	});

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t, player);

	t.update = update;

	return t;

	/**
	 * Обновление крейсера.
	 */
	function update() {

		t.engine.update();

		t.logic && t.logic(t);

	}

}