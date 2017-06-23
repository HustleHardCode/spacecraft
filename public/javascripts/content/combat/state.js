'use strict';

const EntitiesFactory = require('../../game/entities');
const CodeLauncher = require('../../game/launcher');
const Api = require('./api');

const JSJail = require('js-jail');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	let enemyCombatShip;

	let t = state;

	t.entities = entities;
	t.onContextLoaded = onContextLoaded;

	// Границы
	t.bounds = {
		x:      0,
		y:      0,
		width:  2000,
		height: 2000
	};

	return t;

	/**
	 * Метод получения параметров от PlayState.
	 * PlayState осуществляет передачу параметров в момент выполнения своего update метода.
	 * Так как на данный момент мы включаем здесь логику только инициализации
	 * jail'a для боевого корабля противника, то возвращаем false всегда.
	 *
	 * @returns {boolean} true в случае, когда требуется повторно вызывать данный
	 * onContextLoaded метод. В противном случае, вызов больше осуществляться не будет.
     */
	function onContextLoaded(game, {combatEnemyCode}) {

		const jail = JSJail.make(combatEnemyCode);

		enemyCombatShip.logic = () => {

			jail.run(enemyCombatShip.api);

		};

	}

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var bounds = game.world.bounds;
		var height = bounds.height;
		var width = bounds.width;

		EntitiesFactory.createStructure({
											game:    game,
											x:       height - 300,
											y:       300,
											preload: 'combatBase',
											faction: 1
										});

		EntitiesFactory.createStructure({
											game:    game,
											x:       300,
											y:       width - 300,
											preload: 'combatBase',
											faction: 2
										});

		// Создать корабль противника
		enemyCombatShip = EntitiesFactory.createCricket({
															game:    game,
															x:       1000,
															y:       900,
															faction: 2,
															preload: 'combat1'
														});
		// API для корабля противника.
		enemyCombatShip.api = Api(enemyCombatShip);

		// Создать корабль игрока
		var player = EntitiesFactory.createCricket({
													   game:    game,
													   x:       1000,
													   y:       1000,
													   player:  true,
													   faction: 1,
													   preload: 'combat1'
												   });

		player.rotation = -Math.PI / 2;
		// API для урока
		player.api = Api(player);
		player.bringToTop();

		// Фокус на базе
		t.followFor(player);

		CodeLauncher.setArguments(player.api);

	}
}
