'use strict';

// Зависимости
const Prefab = require('../../prefab');
const EMP = require('./emp');

// Экспорт
module.exports = ShieldBlock;

/**
 * Блок щита, который может быть добавлен к кораблю.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function ShieldBlock({
	game,
	unit,
	scale = 1,
	empMaxDiameter,
	maxHealth = 50,
	health = maxHealth,
	heal = 1,
	alpha = 0.2,
	color
}) {

	// that / this
	let t = {};

	// Таймер восстановления щитов.
	let timer;

	// Необходимо сохранить прежний метод.
	// Для переопределения.
	let _damage = unit.damage;

	/**
	 * Электромагнитный импульс.
	 */
	let emp = EMP({
		game: game,
		unit: unit,
		maxDiameter: empMaxDiameter,
		color: color
	});

	/**
	 * Создаем спрайт щита.
	 */
	let sprite = Prefab({
		game: game,
		x: 0,
		y: 0,
		scale: scale,
		alpha: alpha,
		preload: 'shield',
		withoutPhysics: true
	});

	sprite.maxHealth = maxHealth;
	sprite.health = health;

	unit.emp = emp.start;
	unit.damage = damage;

	initialization();

	t.update = update;

	return t;

	/**
	 * Инициализация.
	 */
	function initialization() {

		// Привязываем спрайт щита к кораблю
		unit.addChild(sprite);

		//  Create our Timer
		timer = game.time.create(false);

		//  Set a TimerEvent to occur after 1 seconds
		timer.loop(1000, healShield, this);

		//  Start the timer running - this is important!
		//  It won't start automatically, allowing you to hook it to button events and the like.
		timer.start();

		// TODO нужен destroy?

	}

	/**
	 * Ресет щитов.
	 */
	function reset() {

		if (unit.health === unit.maxHealth) {

			// Иначе восстанавливаем спрайт щит.
			sprite.reset(0, 0, heal);

		}

	}

	/**
	 * Восстановление считов.
	 */
	function healShield() {

		// Если щиты не закончились,
		// то восстанавливаем их.
		if (sprite.alive) {

			sprite.heal(heal);

		} else {

			reset();

		}

	}

	/**
	 * Нанесение урона.
	 */
	function damage(amount) {

		// Если щит существует.
		if (sprite.alive) {

			// Наносим урон щиту.
			sprite.damage(amount);

		} else {

			// Иначе наносим урон кораблю.
			_damage.call(unit, amount);

		}

	}

	/**
	 * Обновление.
	 */
	function update() {

		sprite.alpha = (alpha / sprite.maxHealth) * sprite.health;
		unit.shield = sprite.health;
		unit.maxShield = sprite.maxHealth;

		emp.update();

	}

}
