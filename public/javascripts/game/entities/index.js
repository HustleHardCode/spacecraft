'use strict';

// Библиотеки
const lodash = require('lodash');

// Зависимости
const Unit = require('./units/unit');

const MeteorFactory = require('./meteor');
const MineFieldFactory = require('./mine');
const World = require('./world');

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
	t.MineFieldFactory = MineFieldFactory;

	t.create = create;

	// Сущности
	t.createLocust = createByType(require('./units/heavy/locust'));
	t.createFlea = createByType(require('./units/light/flea'));
	t.createLouse = createByType(require('./units/light/louse'));
	t.createStructure = createByType(require('./units/structure'));
	t.createMantis = createByType(require('./units/heavy/mantis'));
	t.createScout = createByType(require('./units/light/scout'));
	t.createScarab = createByType(require('./units/heavy/scarab'));
	t.createCombat = createByType(require('./units/heavy/combat'));
	t.createHawk = createByType(require('./units/light/hawk'));
	t.createMine = createByType(require('./units/mine'));

	return t;

	/**
	 * Обертка вокруг метода создания.
	 */
	function createByType(typeArgs) {

		return function (userArgs) {

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
