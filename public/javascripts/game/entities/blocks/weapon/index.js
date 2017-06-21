'use strict';

const lodash = require('lodash');

module.exports = WeaponBlock;

/**
 * Created by vaimer on 21.06.2017.
 */

function WeaponBlock(args) {

	console.log(args);

	let t = {};

	let weapons = {};

	t.fire = fire;
	t.fireAtXY = fireAtXY;

	return t;

	function fire(weaponType, obj) {

		if(weapons[weaponType]) {

			lodash.forEach(weapons[weaponType], weapon => weapon.fire(obj));

		}
	}

	function fireAtXY(weaponType, x, y) {

		if(weapons[weaponType]) {

			lodash.forEach(weapons[weaponType], weapon => weapon.fireAtXY(x, y));

		}
	}
}
