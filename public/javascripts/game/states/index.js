'use strict';

// Зависимости
var Runner = require('./runner');

var PlayState = require('./play');
var BootState = require('./boot');
var PreloadState = require('./preload');

// Экспорт
module.exports = StatesManager();

/**
 * Фабрика сущностей.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function StatesManager() {

	// that / this
	var t = {};

	t.createRunnerState = createRunnerState;
	t.createBootState = createBootState;
	t.createPreloadState = createPreloadState;
	t.createPlayState = createPlayState;
	t.createWrappedPlayState = createWrappedPlayState;

	return t;

	/**
	 * Состояние игры с обработкой кода.
	 */
	function createWrappedPlayState(game, key, wrapper) {

		// Состояние
		var state = game.state.add(key, PlayState);

		// Объект запуска кода
		var runner = Runner(game);

		// Добавляем объект запуска кода
		state.setRunner(runner);

		// Обварачиваем PlayState в новый функционал
		wrapper(state);

		return state;

	}

	/**
	 * Состояние игры с обработкой кода.
	 */
	function createRunnerState(game, key) {

		// Состояние
		var state = game.state.add(key, PlayState);

		// Объект запуска кода
		var runner = Runner(game);

		// Добавляем объект запуска кода
		state.setRunner(runner);

		return state;

	}

	/**
	 * Состояние игры с обработкой кода.
	 */
	function createPlayState(game, key) {

		return game.state.add(key, PlayState);

	}

	/**
	 * Состояние загрузки физики и игры.
	 */
	function createBootState(game, key) {

		return game.state.add(key, BootState);

	}

	/**
	 * Состояние загрузки ресурсов.
	 */
	function createPreloadState(game, key) {

		return game.state.add(key, PreloadState);

	}

}
