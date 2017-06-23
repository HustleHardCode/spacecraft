'use strict';

// Библиотеки
var lodash = require('lodash');

// Зависимости
var PrimitivesFactory = require('../../primitives');
var World = require('../world');

// Экспорт
module.exports = ScannerBlock;

/**
 * Блок сканера, который может быть добавлен к кораблю.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function ScannerBlock({
	game,
	unit,
	maxDiameter = 200, 	// Рэндж сканирования.
	color = 0x7AACE8	// Цвет поля скариноваиня.
}) {

	// that / this
	var t = {};

	var currentDiameter = 0;
	var isScanActivated = false;

	/**
	 * Создаем спрайт щита.
	 */
	var primitive = PrimitivesFactory.createCircle(game, currentDiameter, color);

	unit.scan = scan;

	t.update = update;

	return t;

	/**
	 * Инициализация.
	 */
	function update() {

		if (isScanActivated) {

			currentDiameter = currentDiameter > maxDiameter ? 0 : currentDiameter + 1;

			primitive.draw(unit.x, unit.y, currentDiameter);

		} else {

			primitive.clear();

		}

		// Если нулик, то сбрасываем на false.
		isScanActivated = currentDiameter;

	}

	/**
	 * Сканирование местности.
	 *
	 * @param enemies нужны только враги?
	 * @param callback коллбек, в который передаются найденные юниты.
	 * @return {*|Array} найденные юниты.
	 */
	function scan(enemies, callback) {

		isScanActivated = true;

		let units = enemies ? World.getEnemies(unit.faction) : World.getObjects();

		return lodash.filter(units, u => scanFilter(u, callback));
	}

	/**
	 * Фильтрация по диапозону.
	 *
	 * @return {boolean}
	 */
	function scanFilter(u, callback) {

		// Проверка на вхождение в диапозон данного юнита.
		let isScanned = unit.distanceTo(u.x, u.y) < maxDiameter;

		// Найден корабль игрока?
		let isPlayer = u.id === unit.id;

		if (isScanned && !isPlayer) {

			callback && callback(u);

			return true;

		}

	}

}
