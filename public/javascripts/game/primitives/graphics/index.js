'use strict';

// Зависимости
var ScannerCircle = require('./scanner-circle');

// Экспорт
module.exports = GraphicsFactory();

/**
 * Фабрика графики.
 *
 * @author Skurishin Vladislav
 * @since 16.02.17
 */
function GraphicsFactory() {

	// that / this
	var t = {};

	t.createScannerCircle = createScannerCircle;

	return t;

	// Отрисовка круга сканера
	function createScannerCircle(game, x, y, diameter, color) {

		return ScannerCircle(game, x, y, diameter, color);

	}
}
