'use strict';

// Экспорт
module.exports = WeaponBlock;

const lodash = require('lodash');

const World = require('../world');
const AnimationFactory = require('../../animations');

/**
 * Блок оружия, который может быть добавлен к кораблю.
 *
 * @param fireRate период одного выстрела
 * @param game игра
 * @param unit юнит
 * @param bulletSpeed скорость пули
 * @param quantity кол-во пуль в корабле
 * @param bulletKillDistance дистанция полета пули
 * @param offsets описание оффсета всех пуль
 * @param damage урон оружия
 * @param preload имя спрайта
 * @param name имя айтема
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function WeaponBlock({
	game,
	unit,
	name, 						// Имя блока
	preload = 'beam1',			// Имя спрайта
	fireRate = 1000,
	bulletSpeed = 200,
	damage = 10,
	quantity = 30,
	bulletKillDistance = 200,
	offsets						// Описание оффсета всех пуль
}) {

	// that / this
	let t = {};
	let weapon = [];

	// Добавляем как основное оружие.
	unit.fire = fire;
	unit.fireAtXY = fireAtXY;

	// Если определено имя.
	if (name) {

		// То определяем объект оружия
		// и добавляем необходимые методы
		unit[name] = {};
		unit[name].fire = fire;
		unit[name].fireAtXY = fireAtXY;

	}

	t.update = update;

	initialization();

	return t;

	/**
	 * Создаем оружие с заданным оффсетом.
	 * @param o оффсет
	 */
	function createWeapon(o) {

		let w = game.add.weapon(quantity, preload);

		weapon.push(w);

		//  The bullet will be automatically killed when it leaves the camera bounds
		w.bulletKillType = Phaser.Weapon.KILL_DISTANCE;

		// Дистанция, при которой пуля будет уничтожена.
		w.bulletKillDistance = bulletKillDistance;

		//  The speed at which the bullet is fired
		w.bulletSpeed = bulletSpeed;

		//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		w.fireRate = fireRate;

		//  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
		w.trackSprite(unit, o.offsetX, o.offsetY, true);

	}

	/**
	 * Инициализация оружия у корабля.
	 */
	function initialization() {

		lodash.forEach(offsets, o => createWeapon(o));

		unit.bringToTop();

	}

	/**
	 * Выстрел в заданный объект.
	 * Если объект не задан, стреляем впереди корабля.
	 */
	function fire(obj) {

		if (obj) {

			fireAtXY(obj.getX(), obj.getY());

		} else {

			lodash.forEach(weapon, w => w.fireAngle = unit.angle);
			lodash.forEach(weapon, w => w.fire());

		}

	}

	/**
	 * Выстрел по координатам x, y.
	 */
	function fireAtXY(x, y) {

		if(unit.distanceTo(x, y) > bulletKillDistance) {

			return;

		}

		lodash.forEach(weapon, w => w.fireAngle = game.physics.arcade.angleToXY(unit, x, y));
		lodash.forEach(weapon, w => w.fireAtXY(x, y));

	}

	function update() {

		let sprites = World.getObjects();
		let bullets = [];

		lodash.forEach(weapon, w => bullets = lodash.concat(bullets, w.bullets));

		game.physics.arcade.overlap(bullets, sprites, hitEnemy, null, t);

	}

	function hitEnemy(enemy, bullet) {

		// Если фракция врага равна фракции юнита
		// ничего не выполняем.
		if (!enemy.faction || enemy.faction === unit.faction) {

			return;

		}

		bullet.kill();
		enemy.damage(damage);

		AnimationFactory.playExplosion({
			x: bullet.body.x,
			y: bullet.body.y,
			scale: 0.1
		});

	}

}
