'use strict';

var LessonResults = require('../../lesson-results');

module.exports = OperatorPlus();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorPlus () {

	return {
		isRestartDisabled: true,
		title: 'Познай дзен и конкатенацию',
		content: content,
		interpreterHandler: interpreterHandler,
		instructions: '<ul>' +
		'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку ' +
		'<i class="glyphicon glyphicon-play green"></i>.</li>' +
		'<li>Еще о конкатенации: ' +
		'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Web/JavaScript/A_re-introduction_to_JavaScript#Операторы">клац</a>.</li>' +
		'</ul>'
	};

	function content () {

		return '<p>Поговорим об операторе <strong class="under-label">+</strong>.' +
			'<p>Из уроков математики вы знаете, что <strong class="under-label">+</strong> используется для сложения чисел. ' +
			'В <strong>JavaScript</strong> оператор <strong class="under-label">+</strong> можно также использовать для объединения строк.</p>' +
			'<p>Такая операция называется <strong>конкатенацией</strong>.</p>' +
			'<p>Важной особенностью конкатенации является то, что если один из операндов строка, ' +
			'то второй тоже будет приведен к строке.</p>';

	}

	function interpreterHandler (value) {

		var correctText;

		if (value) {

			correctText = '<p>Транслирую:</p>';

			value.forEach(function (v) {

				if (v) {

					correctText += '<p class="bbot-output">' + v + '</p>';

				}

			});

		}

		var lessonResults = LessonResults({
											  correct: correctText,
											  unknownError: '<p>Тададам! И вновь 0шибка!</p>'
										  });

		if (correctText) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.unknownError();
	}
}