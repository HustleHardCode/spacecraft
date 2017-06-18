'use strict';

let EntitiesFactory = require('../../game/entities');
let random = require('../../utils/random');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	let t = state;

	t.entities = entities;
	t.backgroundObjects = require('../backgrounds/academy');

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		let x = game.world.centerX;
		let y = game.world.centerY;

		let base = EntitiesFactory.createStructure({
 			game: game,
			x: x,
			y: y,
			anchorX: 0.8
		});

		for (let h = 0; h < 5; h++) {

			let i1 = random.randomInt(-225, 225);
			let i2 = random.randomInt(-225, 225);

			// Рандомим тип корабля
			let type = random.random() ? EntitiesFactory.createFlea : EntitiesFactory.createLouse;

			let spacecraft = type({
		  		game: game,
				x: x + i1,
		  		y: y + i2
			});

			// Рандомный угол
			spacecraft.angle = game.rnd.angle();

			// Дейстивя харвестра
			spacecraft.logic = function (h) {

				h.moveForward();
				h.rotateLeft();

			}

		}

		// Фокус на на центре.
		game.camera.focusOnXY(x + (base.width / 4), y);

	}
}
