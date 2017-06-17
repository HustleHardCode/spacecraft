'use strict';

// Библиотеки
let lodash = require('lodash');

// Зависимости
let Unit = require('./units/unit');

let MeteorFactory = require('./meteor');
let World = require('./world');

// Экспорт
module.exports = EntitiesFactory();

/**
 * Фабрика сущностей.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function EntitiesFactory() {

	// that / this
	let t = {};

	t.MeteorFactory = MeteorFactory;

	t.create = create;

	// Сущности
	t.createCarrier = createByType(require('./units/heavy/carrier.json'));
	t.createTransport = createByType(require('./units/light/transport'));
	t.createHarvester = createByType(require('./units/light/harvester'));
	t.createStructure = createByType(require('./units/structure'));
	t.createFighter = createByType(require('./units/heavy/fighter'));
	t.createScout = createByType(require('./units/light/scout'));
	t.createCruiser = createByType(require('./units/heavy/cruiser'));
	t.createCombat = createByType(require('./units/heavy/combat'));
	t.createCarriersShip = createByType(require('./units/light/corvette'));
	t.createEbonHawk = createByType(require('./units/light/ebonHawk'));
	t.createLightCorvette = createByType(require('./units/light/corvette'));

	return t;

	/**
	 * Обертка вокруг метода создания.
	 */
	function createByType(typeArgs) {

		return (userArgs) => {

			return create(lodash.assign({}, typeArgs, userArgs));

		}

	}

	/**
	 * Функция создания объекта.
	 */
	function create(args) {

		// Если фабрика не задана, задаем текущую.
		args.factory = args.factory || t;

		let unit = Unit(args);
		let id = World.pushObject(unit);

		// Задаем как объект игрока, если этот корабль юзера.
		args.player && World.setPlayer(id);

		return unit;

	}

}
