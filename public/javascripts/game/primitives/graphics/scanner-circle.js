'use strict';

module.exports = ScannerCircle;

/**
 * Графика круга сканнера.
 *
 * @author Skurishin Vladislav
 * @since 16.02.17
 */
function ScannerCircle(game) {

	var t = {};

	t.draw = draw;
	t.clear = clear;
	t.graphics = game.add.graphics(0, 0);

	return t;

	function draw(x, y, diameter, color) {

		clear();

		t.graphics.alpha = 0.1;
		t.graphics.beginFill(color);
		t.graphics.drawCircle(x, y, diameter);

	}

	function clear() {

		t.graphics.clear();

	}

}
