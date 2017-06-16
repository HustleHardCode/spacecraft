'use strict';

// Экспорт
module.exports = Lesson();

function Lesson() {

	// that / this
	var t = {};

	// Контент урока
	t.lessonContent = require('./lesson-content');

	// Обертка вокруг игрового состояния
	t.state = require('./state');

	return t;

}
