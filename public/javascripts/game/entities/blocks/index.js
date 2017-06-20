'use strict';

// Зависимости
const EngineBlock = require('./engine');
const ShieldBlock = require('./shield');
const ScannerBlock = require('./scanner');
const CargoBlock = require('./cargo');
const CarrierBlock = require('./carrier');
const WeaponBlock = require('./weapon');

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
	let t = {};

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
