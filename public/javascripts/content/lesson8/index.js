'use strict';
/**
 * @author Aleksandrov Oleg
 * @since 04.06.17
 */

module.exports = Lesson();

function Lesson() {

	// that / this
	let t = {};

	t.preload = require('./preload.json');			// Ресурсы
	t.lessonContent = require('./lesson-content');	// Контент урока
	t.state = require('./state');					// Обертка вокруг игрового состояния

	return t;

}
