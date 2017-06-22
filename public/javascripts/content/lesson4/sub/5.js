'use strict';

module.exports = TypeOf();


/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function TypeOf() {

	return {
		title:             'Пусть говорят',
		isRestartDisabled: true,
		question:          {
			content:                 '<p>Кажется пришельцев устроил ваш ответ, но это не точно.</p>' +
									 '<p>Давайте не будем испытывать их гостеприимство. ' +
									 'Нужно бежать как можно быстрее.</p>' +
									 '<p>Но дверь с кодовым замком преграждает вам путь. ' +
									 'На дисплее горит надпись:</p>' +
									 '<pre>Кошечка говорит мяу,<br>' +
									 'собака говорит гав,<br>' +
									 'корова говорит му,<br>' +
									 '<strong class="under-label">typeof 42</strong> говорит...</pre>',
			answerOptions:            [
				'<strong>String</strong>',
				'<strong>Number</strong>',
				'<strong>null</strong>',
				'<strong>Object</strong>'
			],
			correctAnswerNumbers:     [1],
			correctAnswerDescription: '<p>Ну и пусть гов0рят.</p>'
		},
		character:         [{
			audio: 'audio/lesson5/5',
			css:   'astromen-img'
		}]
	};

}
