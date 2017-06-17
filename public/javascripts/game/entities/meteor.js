// Зависимости
let Random = require('../../utils/random');
let Prefabs = require('./prefab');

// Экспорт
module.exports = MeteorFactory();

/**
 * Фабрика метеоритов.
 */
function MeteorFactory() {

	let t = {};

	t.createMeteorField = createMeteorField;
	t.createMeteorSphere = createMeteorSphere;
	t.createMeteorsByFunction = createMeteorsByFunction;

	return t;

	/**
	 * Функция создает метеоритное поле, по определенной кривой, от начальной до конечной точки.
	 * @param startX точка по x, с которой должна начатся отрисовка метеоритого поля
	 * @param finishX точка по x, на которой отрисовка метеортного поля должна закончиться.
	 * @param step шаг, с которым должна происходить отрисовка участков метеоритного поля.
	 * @param count количестов элементов, котороые должны быть сформированны на каждом шаге формирования
	 * метеоритного поля.
	 * @param radius радиус, в котором будут создаваться метеориты на каждом из шагов.
	 * @param calculateMeteorCoordinateY функция для вычисления точки по y,
	 * от которой будет формироваться точка в метеоритном поле.
	 */
	function createMeteorsByFunction({game, startX, finishX, step, count, radius, calculateMeteorCoordinateY}) {

		const _count = count || 5;

		for(let meteorX = startX; meteorX < finishX; meteorX += step) {

			createMeteorSphere({
				x: meteorX,
				y: calculateMeteorCoordinateY(meteorX),
				game: game,
				count: _count,
				radius: radius || step * 2
			});

		}

	}

	/**
	 * Создать округлое метеоритное поле.
	 * @param x центр создаваемой сферы по x
	 * @param y центр создаваемой сферы по y
	 * @param radius радиус окружности
	 * @param count количество метеоритов, которое будет расположенно в генерируемом поле.
	 * Если парметр отсутствует, принимает значение 100.
	 */
	function createMeteorSphere({game, x, y, radius, count}) {

		let meteorX;
		let meteorY;

		// Создаем пыль.
		Prefabs({
			game:    game,
			angle:   game.rnd.angle(),
			preload: Random.random() ? 'redDust' : 'greyDust',
			x:       x,
			y:       y
		});

		const _count = count || 100;

		for(let i = 0; i <= _count; i++) {

			meteorX = Random.randomInt(x - radius, x + radius);
			meteorY = Random.randomInt(y - radius, y + radius);

			const r = Math.pow(meteorX - x, 2) + Math.pow(meteorY - y, 2);

			// Проверяем попадают ли координаты в радиус окружности
			if(r <= Math.pow(radius, 2)) {

				const m = Prefabs({
					game: game,
					preload: 'meteor' + Random.randomInt(1, 21),
					x: 	 meteorX,
					y: 	 meteorY,
					angle: game.rnd.angle()
				});

				setMeteorParameters(m);

			}

		}

	}

	/**
	 * Создать метеоритное поле.
	 */
	function createMeteorField({game, x, y}) {

		let center = new Phaser.Point(x, y);
		let corner = new Phaser.Point(0, 0);

		let radius = Phaser.Point.distance(center, corner);

		createDusts(x, radius, game);
		createMeteors(x, radius, game);

	}

	/**
	 * Создание метеоритов.
	 */
	function createMeteors(x, radius, game) {

		const shift = 4;
		const count = 2 * x;
		const randomSize = 300;

		for (let meteorX = 0; meteorX < count; meteorX += shift) {

			const meteorY = calculateMeteorSphereY(radius, meteorX);

			const meteor = Prefabs({
				game:    game,
				angle:   game.rnd.angle(),
				preload: 'meteor' + Random.randomInt(1, 21),
				x:       meteorX + Random.randomInt(0, randomSize),
				y:       meteorY + Random.randomInt(0, randomSize)
			});

			setMeteorParameters(meteor);

		}

	}

	/**
	 * Создание пыли.
	 */
	function createDusts(x, radius, game) {

		const shift = 100;
		const count = 2 * x;

		for (let meteorX = 0; meteorX < count; meteorX += shift) {

			const meteorY = calculateMeteorSphereY(radius, meteorX);

			Prefabs({
				game:    game,
				angle:   game.rnd.angle(),
				preload: Random.random() ? 'redDust' : 'greyDust',
				x:       meteorX + 150,
				y:       meteorY + 150
			});

		}

	}

	function calculateMeteorSphereY(radius, meteorX) {

		return Math.sqrt(Math.pow(radius, 2) - Math.pow(meteorX, 2));

	}

	function setMeteorParameters(m) {

		m.scale.setTo(Random.randomInt(1, 3) * 0.33);
		m.body.angularVelocity = Random.randomInt(1, 10) * 0.2;

	}

}
