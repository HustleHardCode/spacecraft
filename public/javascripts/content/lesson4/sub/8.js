'use strict';

module.exports = TheEnd();


/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function TheEnd() {

	return {
		title:             'Результаты',
		isRestartDisabled: true,
		question:          {
			content:                  '<p>Вы прошли свой первый тест, поздравляем. Впереди вас ждет еще множество приключений!</p>' +
									  '<p>Вы готовы?</p>',
			answerOptions:            [
				'В бесконечность и далее!'
			],
			correctAnswerNumbers:     [0],
			correctAnswerDescription: '<p>Как жаль, что вы наконец-то уходите...</p>'
		},
		character:         [{
			audio: 'audio/lesson5/8',
			css:   'astromen-img'
		}]
	};

}
