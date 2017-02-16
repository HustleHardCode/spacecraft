'use strict';

// Зависимости
var PrimitivesFactory = require('../../primitives');

// Экспорт
module.exports = ScannerBlock;

/**
 * Блок сканера, который может быть добавлен к кораблю.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function ScannerBlock(spec) {

	// that / this
	var t = {};

	var game = spec.game;
	var unit = spec.unit;
	var maxDiameter = spec.maxDiameter || 200;
	var color = spec.color || 0x7AACE8;

	var currentDiameter = 0;
	var isScanActivated = false;

	/**
	 * Создаем спрайт щита.
	 */
	var primitive = PrimitivesFactory.createScannerCircle(game, currentDiameter, color);

	unit.scan = scan;

	t.update = update;

	return t;

	/**
	 * Инициализация.
	 */
	function update() {

		if (isScanActivated) {


			currentDiameter = currentDiameter > maxDiameter ? 0 : currentDiameter + 1;

			primitive.draw(unit.sprite.x, unit.sprite.y, currentDiameter);

		} else {

			primitive.clear();

		}

		isScanActivated = false;

	}

	function scan() {

		isScanActivated = true;

	}

}
