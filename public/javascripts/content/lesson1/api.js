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

	var moveForwardCalled = false;

	api.isAlive = isAlive;
	api.moveForward = moveForward;
	api.moveToXY = player.moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.isMoveForwardCalled = isMoveForwardCalled;

	return api;

	function moveForward() {

		player.moveForward();

		moveForwardCalled = true;

	}

	function isMoveForwardCalled() {

		return moveForwardCalled;

	}

	function isAlive() {

		return player && player.alive;

	}

}
