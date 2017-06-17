'use strict';

// Экспорт
module.exports = Lesson();

/**
 * Урок 0.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Lesson() {

	// that / this
	var t = {};

	t.lessonContent = require('./lesson-content');	// Контент урока
	t.state = require('./state');					// Обертка вокруг игрового состояния

	return t;

}
