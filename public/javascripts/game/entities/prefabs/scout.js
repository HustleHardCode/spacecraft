'use strict';

module.exports = Scout;

/**
 * Prefab разведчика.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Scout(game, x, y) {

	var t = game.add.sprite(x, y, 'scout');

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	t.body.collideWorldBounds = true;

	return t;

}
