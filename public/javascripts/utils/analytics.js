'use strict';

/**
 * Модуль аналитики.
 * Инкапсулирует в себя реализацию аналитики действия пользователя на сайте.
 *
 * @since 28.04.17
 * @author iretd
 */

module.exports = Analytics();

function Analytics() {

	var that = {};

	that.rateLesson = rateLesson;

	return that;

	/**
	 * Метод аналитики выставления оценки урока.
     */
	function rateLesson(lessonId, rating) {

		var lessonRating = {};
		lessonRating['Урок ' + lessonId] = rating;

		yaCounter43763714 && yaCounter43763714.params({'Оценки уроков' : lessonRating});

	}

}
