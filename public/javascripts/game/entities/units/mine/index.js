'use strict';

const lodash = require('lodash');

const Mine = require('./mine');

// Экспорт
module.exports = MineFactory();

/**
 * Created by vaimer on 18.06.2017.
 */

function MineFactory() {

	let t = {};

	t.createLightMine = createByType(require('./type/light.json'));

	return t;

	function createByType(typeArgs) {

		return function (userArgs) {

			return create(lodash.assign({}, typeArgs, userArgs));

		}
	}

	function create(args) {

		// Если фабрика не задана, задаем текущую.
		args.factory = args.factory || t;

		return Mine(args);
	}
}
