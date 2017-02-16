'use strict';

// Зависимости

// Сущности
var World = require('./world');
var Transport = require('./transport');
var Harvester = require('./harvester');
var AcademyBase = require('./academy-base');
var Meteor = require('./meteor');
var Mine = require('./mine');
var Scout = require('./scout');

var Random = require('../../utils/random');

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
	var t = {};

	var world;	// Контейнер объектов.

	t.initialization = initialization;
	t.createTransport = createTransport;
	t.createHarvester = createHarvester;
	t.createAcademyBase = createAcademyBase;
	t.createMeteor = createMeteor;
	t.createMeteorField = createMeteorField;
	t.createMine = createMine;
	t.createScout = createScout;
	t.getWorld = getWorld;

	return t;

	/**
	 * Создать разведчика.
	 */
	function createScout(game, x, y, player) {

		var scout = Scout(game, x, y, player);

		var id = world.pushObject(scout);

		player && world.setPlayer(id);

		return scout;

	}

	/**
	 * Создать транспорт.
     */
	function createTransport(game, x, y, player) {

		var transport = Transport(game, x, y, player);

		var id = world.pushObject(transport);

		player && world.setPlayer(id);

		return transport;

	}

	/**
	 * Создать транспорт
	 */
	function createHarvester(game, x, y, player) {

		var harvester = Harvester(game, x, y, player);

		var id = world.pushObject(harvester);

		player && world.setPlayer(id);

		return harvester;

	}

	/**
	 * Создать транспорт
	 */
	function createAcademyBase(game, x, y) {

		var base = AcademyBase(game, x, y);

		world.pushObject(base);

		return base;

	}

	/**
	 * Создать метеорит
	 */
	function createMeteor(game, x, y) {

		var meteor = Meteor(game, x, y);

		world.pushObject(meteor);

		return meteor;

	}

	/**
	 * Создать метеоритное поле
	 */
	function createMeteorField(game, x, y) {

		var radius = Phaser.Point.distance(new Phaser.Point(x, y), new Phaser.Point(0, 0));

		// Инициализация
		var count = 2 * x;
		var start = 0;
		var shift = 10;

		// Создаем объект мира
		for (var i = start; i < count; i = i + shift)
		{
			var j = Math.sqrt(radius * radius - i * i);

			var m = createMeteor(game, j + Random.randomInt(0, 200), i + Random.randomInt(0, 200));

			m.sprite.scale.setTo(Random.randomInt(1, 3) * 0.1);
			m.sprite.body.angularVelocity = Random.randomInt(1, 10) * 0.2;

		}

	}

	/**
	 * Создать мину
	 */
	function createMine(game, x, y, scale, group) {

		return Mine(game, x, y, scale, group);

	}

	/**
	 * Возвращаем объект всех сущностей.
     */
	function getWorld() {

		return world;

	}

	/**
	 * Инициализация.
	 */
	function initialization() {

		world = World();

	}
}
