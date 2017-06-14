'use strict';

// Внешние зависимости.
let lodash = require('lodash');

// Внутренние зависимости.
let CodeLauncher = require('../launcher');
let World = require('../entities/world');
let AnimationFactory = require('../animations');

module.exports = PlayState;

/**
 * Состояние инициализации геймплея.
 *
 * @author Skurishin Vladislav
 * @since 02.12.15
 */
function PlayState(game) {

	// Стандартные границы мира.
	let BOUNDS = {
		x:      0,
		y:      0,
		width:  4000,
		height: 4000
	};

	let t = {};

	let params; 		// Параметры инициализации контента.
	let runner;			// Объект запуска кода обработки.
	let cursors;		// Объект ввода / вывода.
	let background;		// Спрайт фона.

	let violetDust;
	let blueDust;
	let yellowDust;
	let hotNebula;
	let coldNebula;

	t.updates = []; 	// Объекты обновления.

	t.create = create;
	t.update = update;
	t.setRunner = setRunner;
	t.followFor = followFor;
	t.pushContextParameters = pushContextParameters;

	return t;

	/**
	 * Этап создания состояния.
	 */
	function create() {

		// Границы мира
		let bounds = t.bounds || BOUNDS;

		game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.width);

		// Создание бэкграунда
		background = game.add.tileSprite(0, 0, game.width, game.height, 'starField');

		background.fixedToCamera = true;

		violetDust = game.add.sprite(0, 0, 'violetDust');
		blueDust = game.add.sprite(0, 0, 'blueDust');
		yellowDust = game.add.sprite(0, 0, 'yellowDust');
		hotNebula = game.add.sprite(0, 0, 'hotNebula');
		coldNebula = game.add.sprite(0, 0, 'coldNebula');

		violetDust.fixedToCamera = true;
		blueDust.fixedToCamera = true;
		yellowDust.fixedToCamera = true;
		hotNebula.fixedToCamera = true;
		coldNebula.fixedToCamera = true;

		// Выполняем инициализацию контейнера игровых объектов.
		World.initialization(game);
		AnimationFactory.initialization(game);

		// Запуск шаблонного метода инициализации сущностей
		t.entities && t.entities(game);

		// Объект ввода / вывода
		cursors = game.input.keyboard.createCursorKeys();
	}

	/**
	 * Установка объекта обработки кода.
	 */
	function setRunner(v) {

		runner = v;

		t.updates.push(runner);

		CodeLauncher.setRunner(runner);

	}

	/**
	 * 	Передаем параметры в игровой стейт.
	 * 	По сути onContextLoaded есть шаблонный метод
	 * 	внутри которого логика работы с передаваемыми данными.
	 *
	 * 	В случае если onContextLoaded вернет false,
	 * 	то метод выполниться единожды с заданными параметрами.
	 */
	function pushParametersIntoState() {

		let needRepeat = t.onContextLoaded(game, params);

		// Если повтор задания не нужен,
		// то убираем функцию.
		if (!needRepeat) {

			params = false;

		}

	}

	/**
	 * Этап обновления состояния.
	 */
	function update() {

		if (params && t.onContextLoaded) {

			pushParametersIntoState();

		}

		// Объекты игрового мира
		let objects = World.getObjects();
		let u = objects.concat(t.updates);

		// Обновление объектов
		u.forEach(e => e.update && e.update(e));

		// Шаблонный метод,
		// для возможности обновить
		// логику с помощью обертки
		t.logic && t.logic(game);

		// Обновление background
		background.tilePosition.set(game.camera.x * -0.3, game.camera.y * -0.3);

		violetDust.cameraOffset.set(game.camera.x * -0.31 + 500, game.camera.y * -0.31 + 500);
		yellowDust.cameraOffset.set(game.camera.x * -0.31 - 500, game.camera.y * -0.31);
		blueDust.cameraOffset.set(game.camera.x * -0.31 + 500, game.camera.y * -0.31);
		hotNebula.cameraOffset.set(game.camera.x * -0.32 + 500, game.camera.y * -0.32);
		coldNebula.cameraOffset.set(game.camera.x * -0.32 - 500, game.camera.y * -0.32 + 500);

	}

	/**
	 * Следует за объектом в заданном квадрате.
	 */
	function followFor(object) {

		let view = game.camera.view;

		let x = Math.max(object.width, 100);
		let y = Math.max(object.height, 200);

		let w = Math.round(view.halfWidth - 2 * x);
		let h = Math.round(view.height - 2 * y);

		let deadzoneCenterX = x + w / 2;
		let deadzoneCenterY = y + h / 2;

		let viewX = Math.round(object.x + view.halfWidth);
		let viewY = Math.round(object.y + view.halfHeight);

		game.camera.follow(object);
		game.camera.deadzone = new Phaser.Rectangle(x, y, w, h);
		game.camera.focusOnXY(viewX - deadzoneCenterX, viewY - deadzoneCenterY);

	}

	/**
	 * Метод передает параметры из контекста ангуляра в
	 * контекст игры. Например: индекс урока.
	 *
	 * @param _params параметры
	 */
	function pushContextParameters(_params) {

		params = _params

	}

}
