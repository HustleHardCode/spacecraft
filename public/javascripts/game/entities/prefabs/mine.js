'use strict';

module.exports = Mine;

/**
 * Prefab мины.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Mine(game, x, y, scale, group) {

	let t = createSprite();

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	scale && t.scale.setTo(scale);

	game.physics.arcade.enableBody(t);

	return t;

	/**
	 * Создаем спрайт в зависимости от существования переменнй группы.
	 */
	function createSprite() {

		if (group) {

			return group.create(x, y, 'mine');

		} else {

			return game.add.sprite(x, y, 'mine')

		}

	}

}
