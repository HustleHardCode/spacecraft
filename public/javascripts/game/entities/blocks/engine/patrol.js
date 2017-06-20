'use strict';

module.exports = Patrol;

// Дистанция при которой точка считается пройденной и необходимо лететь к следущеё точке
const DISTANCE_TO_ACCEPT_POINT = 50;

/**
 * @author Aleksandrov Oleg
 * @since 19.06.17
 * @param points массив, где каждй элемент это new Phaser.Point
 */
function Patrol(points) {

	let pointIndex = 0;

	let t = {};

	t.moveToNextPoint = moveToNextPoint;

	return t;

	function moveToNextPoint(obj) {

		if (obj.distanceTo(points[pointIndex].x, points[pointIndex].y) < DISTANCE_TO_ACCEPT_POINT) {

			pointIndex++;

			if (pointIndex >= points.length) {

				pointIndex = 0;

			}

		} else {

			obj.moveToXY(points[pointIndex].x, points[pointIndex].y);

		}

	}

}
