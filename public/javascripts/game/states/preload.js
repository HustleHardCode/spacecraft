'use strict';

var resources = require('./preload.json');

module.exports = PreloadState;

/**
 * Состояние инициализации ресурсов, картинок, аудио игры.
 *
 * @author Skurishin Vladislav
 * @since 02.12.15
 */
function PreloadState(game) {

	var t = {};

	var onSuccessful;

	t.isPreloading = true;
	t.resources = resources;

	t.preload = preload;
	t.create = create;
	t.update = update;
	t.setSuccessfulCallback = setSuccessfulCallback;

	return t;

	function setSuccessfulCallback(callback) {

		onSuccessful = callback;

	}

	/**
	 *  Этап перед созданием состояния.
	 */
	function preload() {

		// когда все ресурсы будут загружены вызываем callback
		game.load.onLoadComplete.addOnce(onLoadComplete);

		loadResources(t.resources.sprites, game.load.image.bind(game.load));
		loadResources(t.resources.audio, game.load.audio.bind(game.load));

		game.load.spritesheet('explosion', 'images/animations/explosion.png', 128, 128);
		game.load.spritesheet('warpEffectBlue', 'images/animations/warpEffectBlue.png', 320, 364);

	}

	function loadResources(resources, loadFunction) {

		resources && Object.keys(resources).forEach(function (key) {

			loadFunction(key, resources[key]);

		}, resources);
	}

	/**
	 * Этап создания состояния.
	 */
	function create() {

	}

	/**
	 * Этап обновления состояния.
	 */
	function update() {

		// Загружаемся?
		if (!t.isPreloading) {

			// Переходим в состояние - игры
			game.state.start('play');

		}

	}

	/**
	 * При выполнении загрузки всех asset'ов
	 */
	function onLoadComplete() {

		t.isPreloading = false;

		onSuccessful && onSuccessful();

	}

}
