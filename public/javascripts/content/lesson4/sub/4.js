'use strict';

module.exports = TheTruth();


/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function TheTruth() {

	return {
		title:             'Истина',
		isRestartDisabled: true,
		question:          {
			content:                  '<p>Тревога! Тревога!<p>' +
									  '<p>Пока вы мстили <strong>BBot’у</strong>, на корабль напали пришельцы и похитили всех членов экипажа.<p>' +
									  '<p>Они хотят узнать на что люди способны! ' +
									  'Нам нужно доказать этим инопланетяшкам, что даже в непроглядной тьме, мы можем найти лучик истины.</p>' +
									  'Найдите выражение, значение которого равно <strong class="under-label">true</strong>.',
			answerOptions:            [
				'1 > 2',
				'<strong>false</strong>',
				'(15 / 3) > 2',
				'40 > (93 + 100)'
			],
			correctAnswerNumbers:     [2],
			correctAnswerDescription: '<p>А вот нечего над роботами глумитbся!</p>'
		},
		character:         [{
			audio: 'audio/lesson5/4',
			css:   'astromen-img'
		}]
	};

}
