'use strict';

// Экспорт
module.exports = Lesson();

/**
 * @since 31.01.17
 * @author Skurishin Vladislav
 */
function Lesson() {

	// that / this
	var t = {};

	t.lessonContent = require('./lesson-content');	// Контент урока
	t.state = require('./state');					// Обертка вокруг игрового состояния

	return t;

}
