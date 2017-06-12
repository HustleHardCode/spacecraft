'use strict';

// Экспорт
module.exports = CarrierBlock;

/**
 * Блок несущего корабля.
 *
 * @since 09.05.2017
 * @author Skurishin Vladislav
 */
function CarrierBlock(spec) {

	// that / this
	var t = {};

	var game = spec.game;
	var unit = spec.unit;
	var factory = spec.factory;

	unit.create = create;

	return t;

	/**
	 * Создаем носимый корабль.
	 * @param logic логика корабля.
	 * @param player указываем является ли корабль игрока.
	 * @returns {*}
	 */
	function create(logic, player) {

		var x = unit.x;
		var y = unit.y;

		var faction = unit.faction;

		// Фабричный метод. Можно передать разные фабрики, которые
		// сами определяют тип корабля.
		var spaceCraft = factory.createCarriersShip({game, x, y, player, faction});
		spaceCraft.logic = logic.bind(spaceCraft, spaceCraft, unit);
		spaceCraft.rotation = unit.rotation;

		return spaceCraft;
	}

}