'use strict';

/**
 * Зависимости.
 */
var StatesManager = require('./states');
var ContentFactory = require('../content');
var EntitiesFactory = require('./entities');
var CodeLauncher = require('./launcher');
var UpdateManager = require('./update-manager');
var World = require('./entities/world');

// Экспорт
module.exports = Game();

/**
 * Модуль создания игры опредленного типа.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function Game() {

	// that / this
	let t = {};

	let playState;		// Состояние игры.
	let preloadState;	// Состояние подгрузки.

	t.content = ContentFactory;		// Фабрика контента уроков
	t.world = World;				// Мир
	t.factory = EntitiesFactory;    // Фабрика мира и объектов
	t.codeLauncher = CodeLauncher;	// Синглтон заупска кода
	t.updateManager = UpdateManager;// Менеджер обновления

	t.destroy = destroy;
	t.initialization = initialization;
	t.restart = restart;
	t.pushContextParameters = pushContextParameters;

	return t;

	/**
	 * Инициализация состояний
	 */
	function initialization(id, successCallback) {

		// Инициализация игры.
		t.phaser = new Phaser.Game(window.screen.width, window.screen.height, Phaser.CANVAS, 'game-canvas');

		// Получаем контент с заданным идентификатором.
		let content = ContentFactory.content(id);

		// Игровые состояния.
		StatesManager.createBootState(t.phaser, 'boot');

		preloadState = StatesManager.createPreloadState(t.phaser, 'preload');
		playState = StatesManager.createWrappedPlayState(t.phaser, 'play', content.state);

		// Стартуем boot состояние.
		t.phaser.state.start('boot');

		// Если из вне определили коллбэк обработки окончания загрузки игры.
		successCallback && preloadState.setSuccessfulCallback(successCallback);

	}

	/**
	 * Рестарт уже существующей игры.
	 */
	function restart() {

		// Выполняем инициализацию контейнера игровых объектов.
		World.initialization(t.phaser);

		// Стартуем boot состояние.
		t.phaser.state.start('boot');

	}

	/**
	 * Метод передает параметры из контекста ангуляра в
	 * контекст игры. Например: индекс урока.
	 *
	 * @param args агрументы инициализация
	 */
	function pushContextParameters(args) {

		// Проверяем есть ли у стейта метод onContentLoaded.
		playState && playState.pushContextParameters(args);

	}

	/**
	 * Очистка кэша, памяти.
	 */
	function destroy() {

		t.phaser.destroy();

	}

}
