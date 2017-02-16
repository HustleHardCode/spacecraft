'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 *
 * @param player
 */
function Api(player) {

	var api = {};

	api.isScanningActivated = isScanningActivated;
	api.scan = player.scan;
	api.moveForward = player.moveForward;
	api.moveToXY = player.moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.getX = player.getX;
	api.getY = player.getY;

	return api;

	function isScanningActivated() {

		return player.sprite.alive;

	}

}
