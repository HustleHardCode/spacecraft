'use strict';

// Зависимости
var EngineBlock = require('./engine');
var ShieldBlock = require('./shield');
var ScannerBlock = require('./scanner');
var CargoBlock = require('./cargo');
var CarrierBlock = require('./carrier');
var WeaponBlock = require('./weapon');

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

	/**
	 * Добавляем дигатель к юниту.
	 *
	 * @type {EngineBlock}
	 */
	t.engineBlock = EngineBlock;

	/**
	 * Добавляем щит к юниту.
	 *
	 * @type {ShieldBlock}
	 */
	t.shieldBlock = ShieldBlock;

	/**
	 * Добавляем сканер к юниту.
	 *
	 * @type {ScannerBlock}
	 */
	t.scannerBlock = ScannerBlock;

	/**
	 * Добавляем грузовой отсек к юниту.
	 *
	 * @type {CargoBlock}
	 */
	t.cargoBlock = CargoBlock;

	/**
	 * Добавляем блок создания к юниту.
	 *
	 * @type {CarrierBlock}
	 */
	t.carrierBlock = CarrierBlock;

	/**
	 * Добавляем блок оружия к юниту.
	 *
	 * @type {WeaponBlock}
	 */
	t.weaponBlock = WeaponBlock;

	return t;

}
