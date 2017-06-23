'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	let api = {};

	let trueCaptain = false;
	let sensorKilled = false;

	api.moveToXY = player.moveToXY;
	api.fire = player.fire;
	api.isAlive = isAlive;
	api.setOwner = setOwner;
	api.isTrueCaptain = isTrueCaptain;
	api.log = log;
	api.destroy = destroy;
	api.fireAtXY = fireAtXY;
	api.setSensorKilled = setSensorKilled;
	api.isSensorKilled = isSensorKilled;

	return api;

	function destroy() {

		player.kill();

	}

	function isAlive() {

		return player.alive;

	}

	function log() {

		return 'Прочность: ' + player.health + '<br> Статус: К.О.';

	}

	function setOwner(owner) {

		trueCaptain = (owner === 'Кадет');

	}

	function isTrueCaptain() {

		return trueCaptain;

	}

	// Была ли уничтожена мина
	function isSensorKilled() {

		return sensorKilled;

	}

	function setSensorKilled(killed) {

		sensorKilled = killed;

	}

	function fireAtXY(x, y) {

		player.fireAtXY(x, y);

	}

	function fire() {


		player.fire();

	}
}
