'use strict';

module.exports = SpaceCraftCompleter;

/**
 * Модуль автодополнения кода.
 *
 * Created by vladthelittleone on 08.12.15.
 */
function SpaceCraftCompleter(editor, rules) {

	var that = {};

	that.getCompletions = getCompletions;

	return that;

	function getCompletions (edx, session, pos, prefix, callback) {

		// Текушая строка
		var line = session.getLine(editor.getCursorPosition().row);

		// Создание списка автодополнения
		callback(null, generateAutocomplete(rules, line));

	}

}

/**
 * Проверка соответствия с помощью regExp.
 *
 * @param string строка введенная пользователем
 * @param value сравниваемая строка
 */
function test(string, value) {

	var autocomplete = value.autocomplete;

	var result = [];

	// Сравнение строки с заданным regExp.
	value.regExps.forEach(function (r) {

		var regExp = new RegExp(r);

		// Если строка соответсвует регулярному выраению получаем методы для объекта
		if (regExp.test(string)) {

			result = result.concat(autocomplete);

		}

	});

	return result;

}

/**
 * Формирование списка соответствий функций к объектам.
 *
 * @param bindings regExp правила
 * @param line текущая напечатанная строка пользователем
 * @returns {Array}
 */
function generateAutocomplete(bindings, line) {

	var autocompleteNames = [];

	bindings.forEach(function (value) {

		autocompleteNames = autocompleteNames.concat(test(line, value));

	});

	if (!autocompleteNames.length) {

		bindings.forEach(function (value) {

			autocompleteNames = autocompleteNames.concat(value.autocomplete);

		});

	}

	return autocompleteNames;

}
