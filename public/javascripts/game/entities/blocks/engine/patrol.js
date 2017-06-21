'use strict';

module.exports = Patrol;

/**
 * @author Aleksandrov Oleg
 * @since 19.06.17
 * @param points массив, где каждй элемент это new Phaser.Point
 * @param _distanseToAcceptPoint Дистанция при которой точка считается пройденной и необходимо лететь к следущеё точке
 */
function Patrol(points, _distanseToAcceptPoint) {

	let t = {};

	let distanseToAcceptPoint = _distanseToAcceptPoint || 50;
	let pointIndex = 0;

	t.moveToNextPoint = moveToNextPoint;

	return t;

	function moveToNextPoint(obj) {

		if (obj.distanceTo(points[pointIndex].x, points[pointIndex].y) < distanseToAcceptPoint) {

			pointIndex++;

			if (pointIndex >= points.length) {

				pointIndex = 0;

			}

		} else {

			obj.moveToXY(points[pointIndex].x, points[pointIndex].y);

		}

	}

}
