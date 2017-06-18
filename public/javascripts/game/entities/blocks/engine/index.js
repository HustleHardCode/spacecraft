'use strict';

var Trail = require('./trail');
var Stun = require('./stun');
var Warp = require('./warp');

// Экспорт
module.exports = EngineBlock;

/**
 * Блок двигателя, который может быть добавлен к кораблю.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function EngineBlock({
	game,
	unit,
	angularVelocity,
	maxVelocity,
	velocity = maxVelocity,
	preload,
	drag,
	scale,
	trails,
	stunDelay = 5000,
	warpScale
}) {

	// that / this
	let t = {};
	let trailsArray = [];

	let warp = Warp({unit, warpScale});
	let stun = Stun({game, stunDelay});

	unit.moveForward = moveForward;
	unit.rotateLeft = rotateLeft;
	unit.rotateRight = rotateRight;
	unit.moveToXY = moveToXY;
	unit.distanceTo = distanceTo;
	unit.setVelocity = setVelocity;
	unit.getVelocity = getVelocity;
	unit.warp = warp.play;
	unit.stun = stun.start;

	t.update = update;

	initialization();

	return t;

	/**
	 * Инициализация.
	 */
	function initialization() {

		if (trails) {

			trails.forEach(t => {

				let trail = Trail({
					game:              game,
					unit:              unit,
					preload:           preload,
					trailScale:        scale,
					maxParticleSpeedX: t.maxParticleSpeedX,
					maxParticleSpeedY: t.maxParticleSpeedY,
					minParticleSpeedX: t.minParticleSpeedX,
					minParticleSpeedY: t.minParticleSpeedY,
					rotationX:         t.rotationX,
					rotationY:         t.rotationY,
					lifespan:          t.lifespan,
					count:             t.count
				});

				trailsArray.push(trail);

			});

		}

		// Максимальная скорось - ограничение
		unit.body.maxVelocity.set(maxVelocity);

		// Торможение
		unit.body.drag.set(drag);

	}

	/**
	 * Движение вперед.
	 */
	function moveForward() {

		useTrail();

		game.physics.arcade.velocityFromAngle(unit.angle, velocity, unit.body.velocity);

	}

	/**
	 * Движение к координатам.
	 */
	function moveToXY(x, y) {

		var distance = game.math.distance(unit.x, unit.y, x, y);

		// Если дистанция меньше 10,
		// то ничего не выполняем.
		if (distance < 10) {

			return;

		}

		useTrail();

		// Calculate the angle from the missile to the mouse cursor game.input.x
		// and game.input.y are the mouse position; substitute with whatever
		// target coordinates you need.
		var targetAngle = game.math.angleBetween(
			unit.x, unit.y,
			x, y
		);

		// Gradually (angularVelocity) aim the missile towards the target angle
		if (unit.rotation !== targetAngle) {

			// Calculate difference between the current angle and targetAngle
			var delta = targetAngle - unit.rotation;

			// Keep it in range from -180 to 180 to make the most efficient turns.
			if (delta > Math.PI) delta -= Math.PI * 2;
			if (delta < -Math.PI) delta += Math.PI * 2;

			if (delta > 0) {

				// Turn clockwise
				unit.angle += angularVelocity;

			} else {

				// Turn counter-clockwise
				unit.angle -= angularVelocity;

			}

			// Just set angle to target angle if they are close
			if (Math.abs(delta) < game.math.degToRad(angularVelocity)) {

				unit.rotation = targetAngle;

			}

		}

		// Calculate velocity vector based on rotation and velocity
		unit.body.velocity.x = Math.cos(unit.rotation) * velocity;
		unit.body.velocity.y = Math.sin(unit.rotation) * velocity;

	}

	/**
	 * Поворот влево.
	 */
	function rotateLeft() {

		useTrail();
		unit.angle -= angularVelocity;

	}

	/**
	 * Поворот вправо.
	 */
	function rotateRight() {

		useTrail();
		unit.angle += angularVelocity;

	}

	function useTrail() {

		if (!velocity) {

			return;

		}

		trailsArray.forEach(function (trail) {

			trail && trail.start();

		});

	}

	/**
	 * @param _x координата x объекта, до которого считается дистанция
	 * @param _y координата y объекта, до которого считается дистанция
	 * @returns {number} дистанцию до объекта
	 */
	function distanceTo(_x, _y) {

		var deltaX = _x - unit.getX();
		var deltaY = _y - unit.getY();

		return Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	}

	/**
	 * Функция устанавливает скорость корабля. Если новое значение скорости больше текущей на 1
	 * или пользователь пытался увеличить скорость выше максимально допустимой, то считаем
	 * что двигатель перегрелся и скорость сбрасывается до 0.
	 */
	function setVelocity(_velocity) {

		// Ограничение ускорения и максимальной скорости.
		if ((Math.abs(_velocity - velocity) > 1)) {

			stun.start();

			// Не выполняем изменения.
			return;

		}

		velocity = Math.min(maxVelocity, Math.max(_velocity, 0));

	}

	function getVelocity() {

		return velocity;

	}

	/**
	 * Обновление двигателя.
	 */
	function update() {

		// Под станом?
		if (stun.isStunned()) {

			velocity = 0;

		}

		warp.update();

	}
}
