'use strict';

// Зависимости
var EngineBlock = require('./engine');
var ShieldBlock = require('./shield');
var ScannerBlock = require('./scanner');

// Экспорт
module.exports = BlocksFactory();

/**
 * Фабрика prefab'ов.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function BlocksFactory() {

	// that / this
	var t = {};

	t.addEngineBlock = addEngineBlock;
	t.addShieldBlock = addShieldBlock;
	t.addScannerBlock = addScannerBlock;

	return t;

	/**
	 * Добавляем дигатель к юниту.
     */
	function addEngineBlock(spec) {

		return EngineBlock(spec);

	}

	/**
	 * Добавляем щит к юниту.
	 */
	function addShieldBlock(spec) {

		return ShieldBlock(spec);

	}

	/**
	 * Добавляем щит к юниту.
	 */
	function addScannerBlock(spec) {

		return ScannerBlock(spec);

	}
}
