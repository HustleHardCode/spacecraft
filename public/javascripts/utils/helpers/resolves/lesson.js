'use strict';

/**
 * Модуль экспортирует имена и значения resolve'ов состояния 'lesson'.
 *
 * Формат экспорта модуля:
 * names - содержит ИМЕНА resolve'ов;
 * values - содержит ЗНАЧЕНИЯ resolve'ов.
 * Имена (names) экспортируются с целью отсылки на них во внешних модулях.
 * Значения (values) - это и есть сами resolve'ы. Они экспортируются с целью передачи их модулю ui-router.
 *
 * @since 13.05.17
 * @author iretd
 */

var otherResolves = require('./');
var spinnerMessages = require('./../../json/messages/spinner.json');

module.exports = Lesson();

function Lesson() {

	// Имена resolve'ов.
	var names = {
		authentication: otherResolves.names.authentication,
		game:           'game'
	};

	// Значения resolve'ов
	var resolves = {};

	resolves[names.authentication] = otherResolves.values[names.authentication];
	resolves[names.game] = ['promises', '$stateParams', 'spinner', names.authentication, onGame];

	// В качестве экспорта из модуля:
	var t = {};

	t.names = names;
	t.values = resolves;

	return t;

	function onGame(promises, $stateParams, spinner) {

		spinner.start({message: spinnerMessages.game});

		return promises.getGame($stateParams.id);

	}

}
