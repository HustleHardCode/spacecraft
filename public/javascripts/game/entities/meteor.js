// Зависимости
var Random = require('../../utils/random');
var Prefabs = require('./prefab');

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
	 * Создать метеоритное поле.
	 */
	function createMeteorField({game, x, y}) {

		let center = new Phaser.Point(x, y);
		let corner = new Phaser.Point(0, 0);

		let radius = Phaser.Point.distance(center, corner);

		let shift = 10;
		let count = 2 * x;
		let randomSize = 200;

		for (let i = 0; i < count; i = i + shift) {

			let j = Math.sqrt(radius * radius - i * i);

			let m = Prefabs({
				game: game,
				preload: 'meteor' + Random.randomInt(1, 7),
				x: 	 i + Random.randomInt(0, randomSize),
				y: 	 j + Random.randomInt(0, randomSize)
			});

			setMeteorParameters(m);
		}

	}

	/**
	 * Создать метеоритное поле округлое.
	 */
	function createMeteorSphere({game, x, y, radius}) {

		let meteorX;
		let meteorY;

		for(let i = 0; i <= 50; i++) {

			meteorX = Random.randomInt(x - radius, x + radius);
			meteorY = Random.randomInt(y - radius, y + radius);

			let r = Math.pow(meteorX - x, 2) + Math.pow(meteorY - y, 2);

			// Проверяем попадают ли координаты в радиус окружности
			if(r <= Math.pow(radius, 2)) {

				let m = Prefabs({
					game: game,
					preload: 'meteor' + Random.randomInt(1, 7),
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

}
