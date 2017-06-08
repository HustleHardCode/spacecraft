'use strict';

const LessonResults = require('../../lesson-results');
const lodash = require('lodash');

module.exports = OperatorMod();

const outputCorrectNumbers = [19];

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorMod() {

	return {
		isRestartDisabled:  true,
		title:              'На 98% безопасней обычного деления',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:
		'<ul>' +
			'<li>В редакторе коде исправьте выражения находящиеся внутри BBotDebug так, ' +
			'чтобы результат выполнения каждого из них был бы равен числу указанному в комментарии над выражением.</li>' +
			'<li>Не все выражения необходимо исправлять.</li>' +
			'<li>Крупица знаний: ' +
			'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Остаток_от_деления_()">забрать</a>.</li>' +
		'</ul>'
	};

	function content() {

		return '<p>Оператор <strong class="under-label">%</strong>, несмотря на его темное прошлое в математике, ' +
			   'не имеет никакого отношения к процентам. В результате выполнения этого оператора, ' +
			   'мы получаем остаток от деления одного числа на другое. Например:</p>' +
			   '<pre>' +
			   '150 % 100 // 50<br>' +
			   '13 % 10 // 3<br>' +
			   '2 % 1920 // 2' +
			   '</pre> ' +
			   '<p>Исследователи академии заметили небольшую особенность при использовании этого оператора ' +
			   'для положительных чисел: если значение делителя больше делимого, то результатом выполнения оператора ' +
			   '<strong class="under-label">%</strong> будет само делимое.</p>';

	}

	function interpreterHandler(value) {

		const outputText = value ? value.join('<br>') : '';

		const lessonResults = LessonResults({

			correct: '<p>Кадет, еще не уснул? Тогда выполняю:</p>' +
			         '<p class="bbot-output">' + outputText + '</p>',

			notCorrectModUse: '<p>Чт0 здесь вообще прои3ошло? Выполняю:</p>' +
			                  '<p class="bbot-output">' + outputText + '</p>'

		});

		if(!lodash.difference(value, outputCorrectNumbers).length) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.resultNotCorrect('notCorrectModUse');

	}
}
