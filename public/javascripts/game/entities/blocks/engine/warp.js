'use strict';

var AnimationFactory = require('../../../animations');

/**
 * @author Skurishin Vladislav
 * @since 13.07.16
 */
module.exports = Warp;

function Warp({unit, warpScale = 0.5}) {

	let t = {};

	// Флаг необходимый для контроля
	// невидимости.
	let changeAlpha = false;

	t.play = play;
	t.update = update;

	return t;

	/**
	 * Вход в варп режима.
	 */
	function play() {

		unit.alpha = 0;

		AnimationFactory.playWarpEffect({
			x: unit.x,
			y: unit.y,
			angle: unit.angle + 90,
			scale: warpScale
		});

		unit.audio.playWarpEffect();

		changeAlpha = true;

	}

	/**
	 * Обновление инвиза перед варпом.
	 */
	function update() {

		if (changeAlpha) {

			// Постепенный выход из инвиза.
			if (unit.alpha < 1) {

				unit.alpha += 0.05;

			} else {

				unit.alpha = 1;
				changeAlpha = false;

			}

		}

	}

}
