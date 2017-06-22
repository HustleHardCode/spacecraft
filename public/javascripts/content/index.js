'use strict';

// CРАЖЕНИЕ
const combatsContent = [];
combatsContent.push(require('./combat'));

// УРОКИ
const lessonsContent = [];
lessonsContent.push(require('./lesson0'));
lessonsContent.push(require('./lesson1'));
lessonsContent.push(require('./lesson2'));
lessonsContent.push(require('./lesson3'));
lessonsContent.push(require('./lesson4'));
lessonsContent.push(require('./lesson5'));
lessonsContent.push(require('./lesson6'));
lessonsContent.push(require('./lesson7'));

// Экспорт
module.exports = ContentFactory();

/**
 * Фабрика контента уроков.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function ContentFactory() {

	// that / this
	let t = {};

	t.content = lessonContent;		// Метод получения контента по идентификатору
	t.getCombatContent = getCombatContent;

	return t;

	/**
	 * Возвращает урок под заданным номером.
	 */
	function lessonContent(id) {

		// Если id не задан, то игра.
		return id ? lessonContent[id] : combatsContent;

	}

	function getCombatContent(id) {

		return combatsContent[id];

	}
}
