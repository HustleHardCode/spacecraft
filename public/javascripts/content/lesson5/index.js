'use strict';

// Экспорт
module.exports = Lesson();

function Lesson() {

	// that / this
	let t = {};

	t.lessonContent = require('./lesson-content');	// Контент урока
	t.state = require('./state');					// Обертка вокруг игрового состояния

	return t;

}
