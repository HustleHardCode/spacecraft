'use strict';

// Примитивы
var ScannerCircle = require('./scanner-circle');

// Экспорт
module.exports = PrimitivesFactory();

/**
 * Фабрика сущностей.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function PrimitivesFactory() {

	// that / this
	var t = {};

	t.createScannerCircle = createScannerCircle;

	return t;

	/**
	 * Создать разведчика.
	 */
	function createScannerCircle(game, diameter, color) {

		return ScannerCircle(game, diameter, color);

	}

}
