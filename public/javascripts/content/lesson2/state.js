'use strict';

// Зависимости
var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');

var random = require('../../utils/random');

var Api = require('./api');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	var t = state;

	var player;		// Игрок
	var graphics;	// Графика

	t.entities = entities;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		// Инициализация графики
		graphics = game.add.graphics(0, 0);

		// Создать транспорт
		player = EntitiesFactory.createScout(game, 1000, 1000, true);
		var sprite = player.sprite;

		sprite.rotation = - Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Создать метеоритное поле
		EntitiesFactory.createMeteorField(game, x, y);

		// Корабль на верх.
		sprite.bringToTop();

		// Фокус на на центре
		t.followFor(sprite);

		CodeLauncher.setArguments(player.api);

	}

}
