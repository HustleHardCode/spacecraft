'use strict';

var Trail = require('./trail');

// Экспорт
module.exports = EngineBlock;

/**
 * Блок двигателя, который может быть добавлен к кораблю.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function EngineBlock(spec) {

	// that / this
	var t = {};

	var game = spec.game;
	var unit = spec.unit;

	var angularVelocity = spec.angularVelocity;
	var velocity = spec.velocity;
	var drag = spec.drag;

	if(spec.trail){

		t.trail = Trail(game, unit, spec.trailX, spec.trailY);

	}


	unit.moveForward = moveForward;
	unit.rotateLeft = rotateLeft;
	unit.rotateRight = rotateRight;
	unit.moveToXY = moveToXY;

	t.update = update;

	initialization();

	return t;

	/**
	 * Инициализация.
	 */
	function initialization() {

		// Максимальная скорось - ограничение
		unit.sprite.body.maxVelocity.set(velocity);

		// Торможение
		unit.sprite.body.drag.set(drag);

	}

	/**
	 * Движение вперед.
	 */
	function moveForward() {

		useTrail();

		game.physics.arcade.velocityFromAngle(unit.sprite.angle, velocity, unit.sprite.body.velocity);

	}

	/**
	 * Движение к координатам.
	 */
	function moveToXY(x, y) {

		useTrail();

		var distance = game.math.distance(unit.sprite.x, unit.sprite.y, x, y);

		// Если дистанция меньше 10,
		// то ничего не выполняем.
		if (distance < 10) {

			return;

		}

		// Calculate the angle from the missile to the mouse cursor game.input.x
		// and game.input.y are the mouse position; substitute with whatever
		// target coordinates you need.
		var targetAngle = game.math.angleBetween(
			unit.sprite.x, unit.sprite.y,
			x, y
		);

		// Gradually (angularVelocity) aim the missile towards the target angle
		if (unit.sprite.rotation !== targetAngle) {

			// Calculate difference between the current angle and targetAngle
			var delta = targetAngle - unit.sprite.rotation;

			// Keep it in range from -180 to 180 to make the most efficient turns.
			if (delta > Math.PI) delta -= Math.PI * 2;
			if (delta < -Math.PI) delta += Math.PI * 2;

			if (delta > 0) {

				// Turn clockwise
				unit.sprite.angle += angularVelocity;

			} else {

				// Turn counter-clockwise
				unit.sprite.angle -= angularVelocity;

			}

			// Just set angle to target angle if they are close
			if (Math.abs(delta) < game.math.degToRad(angularVelocity)) {

				unit.sprite.rotation = targetAngle;

			}

		}

		// Calculate velocity vector based on rotation and velocity
		unit.sprite.body.velocity.x = Math.cos(unit.sprite.rotation) * velocity;
		unit.sprite.body.velocity.y = Math.sin(unit.sprite.rotation) * velocity;

	}

	/**
	 * Поворот влево.
	 */
	function rotateLeft() {

		useTrail();
		unit.sprite.angle -= angularVelocity;

	}

	/**
	 * Поворот вправо.
	 */
	function rotateRight() {

		useTrail();
		unit.sprite.angle += angularVelocity;

	}

	function useTrail(){

		if(spec.trail) {

			t.trail.start();

		}
	}

	/**
	 * Обновление двигателя.
	 */
	function update() {

	}
}
