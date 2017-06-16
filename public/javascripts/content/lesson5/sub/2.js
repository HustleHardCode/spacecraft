'use strict';

var LessonResults = require('../../lesson-results');

module.exports = OperatorsAndOperands();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorsAndOperands() {

	return {
		isRestartDisabled:  true,
		title:              'Нужно бооольше операторов!',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:       '<ul>' +
							'<li>Для запуска кода нажмите, в правом верхнем углу, ' +
							'на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
							'<li>Больше интересной инфы: ' +
							'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Expressions_and_Operators">клац</a>.</li>' +
							'</ul>',
		character:    [{
			audio: 'audio/lesson1/3-1',
			css:   'astromen-img',
			video: {
				url: 'https://youtu.be/X_QjS0EjteI',
				content: 'Об математических операторах от гуру <b>JavaScript</b> - команды <b>Хекслет</b>. Прямиком из 2017 года!'
			}
		}]
	};

	function content() {

		return '<p>Сегодня мы поговорим об операторах и операндах.' +
			'<p>В предыдущих уроках вы уже сталкивались с операторами языка <strong>JavaScript</strong>: ' +
			'<span class="under-label"><strong>+</strong></span>, ' +
			'<span class="under-label"><strong>=</strong></span>, ' +
			'<span class="under-label"><strong>></strong></span>. ' +
			'Но что такое операнд? Это сущность, к которой применяются операторы. Например:' +
			'<p><pre>' +
			'// Оператор сложения: +.\n' +
			'// Операнд: число 5, число 4.\n' +
			'<strong>5</strong> + <strong>4</strong>' +
			'</pre>' +
			'<p>Оператор может быть применен к одному операнду - <strong>унарный оператор</strong> ' +
			'или к двум - <strong>бинарный оператор</strong>.';

	}

	function interpreterHandler(value) {

		var lessonResults = {

			correct: '<p>Фиии, чт0 за числа! Транслирую:</p>' +
					 '<p class="bbot-output">{{correctText}}</p>',

			unknownError: '<p>Упс! Неизвестная ошибка!</p>' +
						  '<p>ВАЛЛ-И отсюда злобный жук!</p>'

		};

		return LessonResults(lessonResults)
			.resultsWrapper(value);
	}
}
