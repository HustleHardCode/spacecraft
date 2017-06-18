'use strict';

// Библиотеки
let lodash = require('lodash');

// Зависимости
let BlocksFactory = require('../blocks');
let AnimationFactory = require('../../animations');
let Random = require('../../../utils/random');
let World = require('../world');

let GameAudioFactory = require('../../audio');
let Prefab = require('../prefab');

// Экспорт
module.exports = Unit;

/**
 * Объект юнита.
 */
function Unit(args) {

	// Деструктуризация аргументов
	let {
			game, 					// Игровой объект
			player,					// Юнит игрока?
			hullPreload,			// Спрайт каркаса
			faction,				// Фракция
			needAudio,				// Необходима аудио поддержка?
			isRotating,				// Базы и планеты поварачиваем на лево.
			maxHealth,				// Максимальное HP
			health = maxHealth,		// Начальные HP
			blocks,					// Блоки, которые добавляются к кораблю
			killOptions				// Настройки смерти
		}          = args;

	// that / this
	let t = Prefab(args);

	// Менеджер блоков
	let blocksManager = [];

	/**
	 * Коллбеки.
	 */
	t.events.onKilled.add(onKillCallback, this);

	t.faction = faction;
	t.health = health;
	t.maxHealth = maxHealth;
	t.addBlock = addBlock;
	t.getX = getX;
	t.getY = getY;

	initialization();

	/**
	 * Аудио менеджер.
	 */
	needAudio && (t.audio = GameAudioFactory(game, t, player));

	t.update = update;

	return t;

	/**
	 * Инициализация юнита.
	 */
	function initialization() {

		// Если есть параметр спрайта карскасаб
		// добавляем его к parent-спрайту.
		if (hullPreload) {

			let hullSprite = game.add.sprite(0, 0, hullPreload);

			hullSprite.anchor.x = 0.5;
			hullSprite.anchor.y = 0.5;

			t.addChild(hullSprite);
		}

		blockInitialization();

	}

	/**
	 * Инициализация блоков корабля.
	 */
	function blockInitialization() {

		// Если передаваемые объекты undefined, то
		// Add[*]Block вернет undefined.
		lodash.forEach(blocks, b => addBlock(b));

	}

	/**
	 * Добавляем блок к кораблю.
	 *
	 * @param blockParams - описание параметров блока.
	 */
	function addBlock(blockParams) {

		let addBlockFunction = BlocksFactory[blockParams.type];
		let params = lodash.assign({}, args, blockParams, {unit: t});

		// Если функции созадния блока не существует,
		// то continue.
		if (!addBlockFunction) {

			return;

		}

		// Добавляем блок
		blocksManager.push(addBlockFunction(params));

	}

	/**
	 * Обновление.
	 */
	function update() {

		lodash.forEach(blocksManager, b => b.update && b.update());

		t.logic && t.logic(t);

		isRotating && t.rotateLeft();

	}

	/**
	 * Логика уничтожения корабля.
	 */
	function onKillCallback() {

		// Если не определены настройки
		// ничего не делаем.
		if (!killOptions) {

			return;

		}

		let x = t.x;
		let y = t.y;

		lodash.forEach(killOptions.explosion, o => {

			let offsetX = Random.randomInt(o.offsetX[0], o.offsetX[1]);
			let offsetY = Random.randomInt(o.offsetY[0], o.offsetY[1]);
			let scale = o.randomScale ? Math.random() : 1;

			AnimationFactory.playExplosion({
				x:     x + offsetX,
				y:     y + offsetY,
				scale: scale
			});

		});

		// Удаляем объект из мира.
		World.removeObject(t);

		// Играем аудио взрыва.
		t.audio && t.audio.playExplosion();
	}

	/**
	 * @returns коордианту X в пространстве
	 */
	function getX() {

		return t.x;

	}

	/**
	 * @returns коордианту Y в пространстве
	 */
	function getY() {

		return t.y;

	}
}
