'use strict';

var Explosion = require('./explosion');
var WarpEffect = require('./warp');

// Экспорт
module.exports = AnimationsFactory();

/**
 * Фабрика анимаций.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function AnimationsFactory() {

	// that / this
	let t = {};
	let game;

	t.initialization = initialization;
	t.playExplosions = playExplosions;
	t.playExplosion = Explosion.play;
	t.playWarpEffect = WarpEffect.play;

	return t;

	/**
	 * Инициализация группы анимации.
	 *
	 * @param _game
	 */
	function initialization(_game) {

		game = _game;

		// Анимации взрыва.
		Explosion.initialization(game);
		WarpEffect.initialization(game);

	}

	/**
	 * Анимации взрыва.
	 */
	function playExplosions(explosions) {

		explosions.forEach(Explosion.play);

	}

}
