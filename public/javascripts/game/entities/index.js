'use strict';

// Зависимости

// Сущности
const Meteor = require('./units/static/meteor');
const Mine = require('./units/static/mine');
const StaticUnit = require('./units/static/static-unit');

const Cruiser = require('./units/heavy/cruiser');
const Carrier = require('./units/heavy/carrier');
const Combat = require('./units/heavy/combat');
const Fighter = require('./units/heavy/fighter');

const Transport = require('./units/light/transport');
const Harvester = require('./units/light/harvester');
const Scout = require('./units/light/scout');
const LightCorvette = require('./units/light/corvette');
const EbonHawk = require('./units/light/ebonHawk');

const Planet = require('./units/base/planet');
const ResearchCenter = require('./units/base/research-center');
const AcademyBase = require('./units/base/academy-base');
const PirateBase = require('./units/base/pirate-base');
const Base = require('./units/base/base');

const World = require('./world');
const Random = require('../../utils/random');

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

	t.createMeteorField = createMeteorField;
	t.createMeteorSphere = createMeteorSphere;
	t.createMeteors = createMeteors;

	t.createMine = Mine;
	t.createStaticUnit = StaticUnit;

	t.createSensor = createByType(StaticUnit);
	t.createCarrier = createByType(Carrier);
	t.createBase = createByType(Base);
	t.createMeteor = createByType(Meteor);
	t.createTransport = createByType(Transport);
	t.createHarvester = createByType(Harvester);
	t.createAcademyBase = createByType(AcademyBase);
	t.createPlanet = createByType(Planet);
	t.createFighter = createByType(Fighter);
	t.createResearchCenter = createByType(ResearchCenter);
	t.createScout = createByType(Scout);
	t.createCruiser = createByType(Cruiser);
	t.createCombat = createByType(Combat);
	t.createCarriersShip = createByType(LightCorvette);
	t.createEbonHawk = createByType(EbonHawk);
	t.createLightCorvette = createByType(LightCorvette);
	t.createPirateBase = createByType(PirateBase);

	return t;


	/**
	 * Функция создает метеоритное поле, по определенной кривой, от начальной до конечной точки.
	 * @param startX точка по x, с которой должна начатся отрисовка метеоритого поля
	 * @param finishX точка по x, на которой отрисовка метеортного поля должна закончиться.
	 * @param step шаг, с которым должна происходить отрисовка участков метеоритного поля.
	 * @param count количестов элементов, котороые должны быть сформированны на каждом шаге формирования
	 * метеоритного поля.
	 * @param radius радиус, в котором будут создаваться метеориты на каждом из шагов.
	 * @param calculateMeteorCoordinateY функция для вычисления точки по y, от которой будет формироваться точка в метеоритном поле.
	 */
	function createMeteors({game, startX, finishX, step, count, radius, calculateMeteorCoordinateY}) {

		let _count = count || 5;

		for(let i = startX; i < finishX; i += step) {

			createMeteorSphere({
				x: i,
				game: game,
				y: calculateMeteorCoordinateY(i),
				count: _count,
				radius: radius || step * 2
			});

		}

	}

	/**
	 * Создать метеоритное поле.
	 */
	function createMeteorField({game, x, y, count}) {

		let radius = Phaser.Point.distance(new Phaser.Point(x, y),
			                               new Phaser.Point(0, 0));

		let shift = 10;
		let _count = count ? count * 10 : 2 * x;
		let randomSize = 200;

		for (let i = 0; i < _count; i += shift) {

			let j = Math.sqrt(radius * radius - i * i);

			let m = t.createMeteor({
				game: game,
				x: 	 i + Random.randomInt(0, randomSize),
				y: 	 j + Random.randomInt(0, randomSize)
			});

			setMeteorParameters(m);
		}

	}

	/**
	 * Создать метеоритное поле округлое.
	 */
	function createMeteorSphere({game, x, y, radius, count}) {

		let meteorX;
		let meteorY;

		let _count = count || 100;

		for(let i = 0; i <= _count; i++) {

			meteorX = Random.randomInt(x - radius, x + radius);
			meteorY = Random.randomInt(y - radius, y + radius);

			// Проверяем попадают ли координаты в радуик окружности
			if(Math.pow(meteorX - x, 2) + Math.pow(meteorY - y, 2) <= Math.pow(radius, 2)) {

				let m = t.createMeteor({
					game: game,
					x: 	 meteorX,
					y: 	 meteorY
				});

				setMeteorParameters(m);

			}

		}

	}

	function setMeteorParameters(m) {

		m.scale.setTo(Random.randomInt(1, 3) * 0.1);
		m.body.angularVelocity = Random.randomInt(1, 10) * 0.2;

	}

	/**
	 * Обертка вокруг метода создания.
	 */
	function createByType(type) {

		return (args) => {

			return create(args, type);

		}

	}

	/**
	 * Функция создания объекта.
	 *
	 * @param args параметры
	 * @param args.game игра
	 * @param args.x координата X объекта
	 * @param args.y координата Y объекта
	 * @param args.player объект игрока
	 * @param args.faction фракция объекта
	 * @param args.preload объект спрайта
	 * @param args.factory фабрика объектов
	 * @param createFunction функция создания юнита
	 */
	function create(args, createFunction) {

		// Если фабрика не задана, задаем текущую.
		args.factory = args.factory || t;

		let unit = createFunction(args);
		let id = World.pushObject(unit);

		// Задаем как объект игрока, если этот корабль юзера.
		args.player && World.setPlayer(id);

		return unit;

	}

}
