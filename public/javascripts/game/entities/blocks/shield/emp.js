'use strict';

// Библиотеки
var lodash = require('lodash');

// Зависимости
var PrimitivesFactory = require('../../../primitives');
var World = require('../../world');

// Экспорт
module.exports = Emp;

/**
 * Электромагнитный импульс.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Emp({
	game,
	unit,
	maxDiameter = 200, 	// Рэндж сканирования.
	color = 0xFF0000	// Цвет поля скариноваиня.
}) {

	// that / this
	var t = {};

	var currentDiameter = 0;
	var isEmpActivated = false;

	/**
	 * Создаем спрайт щита.
	 */
	var primitive = PrimitivesFactory.createCircle(game, currentDiameter, color);

	t.start = start;
	t.update = update;

	return t;

	/**
	 * Инициализация.
	 */
	function update() {

		if (isEmpActivated) {

			currentDiameter = currentDiameter > maxDiameter ? 0 : currentDiameter + 1;

			primitive.draw(unit.x, unit.y, currentDiameter);

		} else {

			primitive.clear();

		}

		// Если нулик, то сбрасываем на false.
		isEmpActivated = currentDiameter;

	}

	/**
	 * Сканирование местности.
	 *
	 * @return {*|Array} найденные юниты.
	 */
	function start() {

		isEmpActivated = true;

		let units = World.getEnemies(unit.faction);

		lodash.forEach(units, u => {

			if(empFilter(u)) {

				u.stun();

			}

		});


	}

	/**
	 * Фильтрация по диапазону.
	 *
	 * @return {boolean}
	 */
	function empFilter(u) {

		// Проверка на вхождение в диапозон данного юнита.
		let isFiltered = unit.distanceTo(u.x, u.y) < maxDiameter;

		// Найден корабль игрока?
		let isPlayer = u.id === unit.id;

		return isFiltered && !isPlayer;

	}

}
