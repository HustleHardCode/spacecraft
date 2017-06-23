'use strict';

// Библиотеки
const lodash = require('lodash');

// Экспорт
module.exports = ItemsFactory();

/**
 * Фабрика сущностей.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function ItemsFactory() {

	// that / this
	let t = {};

	// Сущности
	t.basicLaser = require('./weapon/basic-laser');

	return t;

}
