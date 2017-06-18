'use strict';

// Экспорт
module.exports = CarrierBlock;

/**
 * Блок несущего корабля.
 *
 * @since 09.05.2017
 * @author Skurishin Vladislav
 */
function CarrierBlock({
	game,
	unit,
	createMethod,
	factory
}) {

	// that / this
	var t = {};

	unit.create = create;

	return t;

	/**
	 * Создаем носимый корабль.
	 * @param logic логика корабля.
	 * @param player указываем является ли корабль игрока.
	 * @returns {*}
	 */
	function create(logic, player) {

		let method = factory[createMethod];

		// Если метода по созданию не существует,
		// выходим из метода.
		if (!method) {

			return;

		}

		var x = unit.x;
		var y = unit.y;

		var faction = unit.faction;

		// Фабричный метод. Можно передать разные фабрики, которые
		// сами определяют тип корабля.
		var spaceCraft = method({game, x, y, player, faction});
		spaceCraft.logic = logic.bind(spaceCraft, spaceCraft, unit);
		spaceCraft.rotation = unit.rotation;

		return spaceCraft;
	}

}
