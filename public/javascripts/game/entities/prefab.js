'use strict';

module.exports = Prefab;

/**
 * Prefab корабля.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Prefab({
	game,
	x = 0, 					// Координата x
	y = 0, 					// Координата y
	preload, 				// Имя спрайтов
	scale = 1,				// Скалирование
	anchorX = 0.5,			// Якорь по x
	anchorY = 0.5, 			// Якорь по y
	angle,					// Угол поворота
	alpha = 1, 				// Прозрачность
	group,					// Группа?
	prefabAngularVelocity,	// Скорость поворота
	cameraOffset,			// Движение относительно камеры?
	withoutPhysics			// Без физики?
}) {

	var t = create();

	// Центрирование.
	t.anchor.x = anchorX;
	t.anchor.y = anchorY;

	// Альфа.
	t.alpha = alpha;

	// Устанавливаем скорость оборота
	prefabAngularVelocity && (t.body.angularVelocity = prefabAngularVelocity);

	scale && t.scale.setTo(scale);
	angle && (t.angle = angle);

	if (!withoutPhysics) {

		game.physics.arcade.enableBody(t);

		t.body.collideWorldBounds = true;

	}

	// Фиксируем относительно камеры
	cameraOffset && (t.fixedToCamera = true);

	t.update = update;

	return t;

	/**
	 * Создаем спрайт в зависимости от существования переменнй группы.
	 */
	function create() {

		if (group) {

			return group.create(x, y, preload);

		}

		return game.add.sprite(x, y, preload)

	}

	/**
	 * Обновление спрайта.
	 */
	function update() {

		if (cameraOffset) {

			let x = game.camera.x * cameraOffset.coefficient + (cameraOffset.x || 0);
			let y = game.camera.y * cameraOffset.coefficient + (cameraOffset.y || 0);

			t.cameraOffset.set(x, y);

		}

	}

}
