'use strict';

const lodash = require('lodash');

const Weapon = require('./weapon');

module.exports = WeaponBlock;

/**
 * Created by vaimer on 21.06.2017.
 */

function WeaponBlock(args) {

	let t = {};

	let weapons = {};

	t.fire = fire;
	t.fireAtXY = fireAtXY;
	t.update = update;

	initialize();

	return t;

	function initialize() {

		lodash.forEach(args.weapons, weapon => {

			let type = weapon.type;

			let newWeapon = Weapon(lodash.assign({}, {game: args.game, unit: args.unit}, weapon));

			if(!weapons[type] ||
			   lodash.isEmpty(weapons[type])) {

				weapons[type] = [newWeapon];

			} else {

				weapons[type].push(newWeapon);

			}
		});
	}

	function fire(weaponType, obj) {

		if(weaponType &&
		   weapons[weaponType]) {

			lodash.forEach(weapons[weaponType], weapon => weapon.fire(obj));

		}
	}

	function fireAtXY(weaponType, x, y) {

		if(weaponType &&
		   weapons[weaponType]) {

			lodash.forEach(weapons[weaponType], weapon => weapon.fireAtXY(x, y));

		}
	}

	function update() {

		lodash.forEach(weapons, w => w.update && w.update());

	}
}
