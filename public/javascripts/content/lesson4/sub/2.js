'use strict';

module.exports = RotateLeft();


/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function RotateLeft() {

	return {
		title:             'Столкновение',
		isRestartDisabled: true,
		question:          {
			content:                  '<p>Хорошо, начнем с увертюры.</p>' +
									  '<p>Представте, что вы пилотируете космический корабль ' +
									  'и вот-вот столкнетесь с огромным метеоритом, летящим навстречу. ' +
									  'От капитана поступает приказ:</p>' +
									  '<pre>Мистер Сулу, немедленно выполнить поворот налево!</pre> ' +
									  '<p>Какую команду вы отдадите кораблю?</p>',
			answerOptions:            [
				'<strong>transport</strong>.rotateRight()',
				'<strong>transport</strong>.rotateLeft()',
				'<strong>transport</strong>.rotate()',
				'<strong>transport</strong>.stop()'
			],
			correctAnswerNumbers:     [1],
			correctAnswerDescription: '<p>Лееевоо руля!</p>'
		},
		character:         [{
			audio: 'audio/lesson5/2',
			css:   'wonk-img'
		}]
	};

}
