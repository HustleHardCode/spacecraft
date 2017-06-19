'use strict';

const lodash = require('lodash');
const Mine = require('./units/mine');

// Экспорт
module.exports = MineFieldFactory();

/**
 * Created by vaimer on 16.06.17.
 */
function MineFieldFactory() {

	let t = {};

	t.createMineField = createMineField;

	return t;

	/**
	 * Создание минного поля.
	 */
	function createMineField({game, x, y, createFunction}) {

		// Создаем группу из мин
		let mines = game.add.group();

		// Создаем поле мин в шахматном порядке
		for (let i = 0; i < 6; i++) {

			for (let j = 0; j < 6; j++) {

				// Складываем индексы и мод 2,
				// 0 и 1 в таком случае будут чередоваться
				if ((i + j) % 2 === 0) {

					let deltaY = 20 * i;
					let deltaX = 20 * j;

					createFunction({
						game: game,
						x: x + deltaX,
						y: y + deltaY,
						group: mines
					});

				}

			}
		}
	}
}
