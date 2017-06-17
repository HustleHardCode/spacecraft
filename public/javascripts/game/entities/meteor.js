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

	return t;

	/**
	 * Создание метеоритов.
	 */
	function createMeteors(x, radius, game) {

		let shift = 4;
		let count = 2 * x;
		let randomSize = 300;

		for (let i = 0; i < count; i = i + shift) {

			let j = Math.sqrt(radius * radius - i * i);

			let m = Prefabs({
				game:    game,
				angle:   game.rnd.angle(),
				preload: 'meteor' + Random.randomInt(1, 21),
				x:       i + Random.randomInt(0, randomSize),
				y:       j + Random.randomInt(0, randomSize)
			});

			setMeteorParameters(m);
		}
	}

	/**
	 * Создание пыли.
	 */
	function createDusts(x, radius, game) {

		let shift = 100;
		let count = 2 * x;

		for (let i = 0; i < count; i = i + shift) {

			let j = Math.sqrt(radius * radius - i * i);

			Prefabs({
				game:    game,
				angle:   game.rnd.angle(),
				preload: Random.random() ? 'redDust' : 'greyDust',
				x:       i + 150,
				y:       j + 150
			});

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
	 * Создать метеоритное поле округлое.
	 */
	function createMeteorSphere({game, x, y, radius}) {

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

		for(let i = 0; i <= 100; i++) {

			meteorX = Random.randomInt(x - radius, x + radius);
			meteorY = Random.randomInt(y - radius, y + radius);

			let r = Math.pow(meteorX - x, 2) + Math.pow(meteorY - y, 2);

			// Проверяем попадают ли координаты в радиус окружности
			if(r <= Math.pow(radius, 2)) {

				let m = Prefabs({
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

	function setMeteorParameters(m) {

		m.scale.setTo(Random.randomInt(1, 3) * 0.33);
		m.body.angularVelocity = Random.randomInt(1, 10) * 0.2;

	}

}
