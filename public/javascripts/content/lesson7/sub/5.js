'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = ComplexLogicalExpressionAnd();

var lodash = require('lodash');

/**
 * Created by vaimer on 20.05.2017.
 */
function ComplexLogicalExpressionAnd() {

	var lessonTableColumns = ['&&', 'true', 'false'];
	var lessonTableRows = [
		['<strong>true</strong>', 'true', 'false'],
		['<strong>false</strong>', 'false', 'false']
	];
	return {
		isRestartDisabled: true,
		title:             'Две палочки',
		character:         [{
			audio: 'audio/lesson6/8-1',
			css:   'astromen-img',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows
			}
		}, {
			audio: 'audio/lesson6/8-1',
			css:   'astromen-img',
			// Рассмотрим другой логический оператор && (и), который возвращает «true», если оба
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [1],
				hintRows: [0]
			}
		}, {
			audio: 'audio/lesson6/8-1',
			css:   'astromen-img',
			//  возвращают «true», иначе возвращает «false»
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [1, 2],
				hintRows: [1]
			}
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
			  '<li>Измените значение переменной <strong>isLaser2Ready</strong> на <span class="under-label">true</span>.</li>' +
			  '</ul>',

		instructions: '<ul>' +
					  '<li>Изучите комментарии к коду.</li>' +
					  '<li>Сделайте так, чтобы условие на <strong>13</strong> строчке было истинным.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(scout) {

		var lessonResults = LessonResults({

			correct: '<p>На оружие полагаешься, н0 оружием нельзя выиграть сражение. </p>' +
					 '<p>Разум твой всего сильнее.</p>',

			unknownError: '<p>Что-т0 не так! Оружие не прошло проверку!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

			text: '<p>Вдарим р0к в этой дыре!</p> '
		});

		if (scout.isSensorKilled()) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();

	}

	function content() {

		return '<p>Рассмотрим другой логический оператор <b>&&</b> (и), который возвращает <b>«true»</b>, ' +
			'если оба операнда возвращают <b>«true»</b>, иначе возвращает <b>«false»</b>.</p>' +
			'<p>Стоит обратить внимание на то, что второй операнд игнорируется, ' +
			'если результатом вычисления первого операнда является значение <b>«false»</b>. </p> ' +
			'<pre> ' +
			'<b>var</b> result = <b>op1</b> && <b>op2</b>;' +
			'</pre>' +
			'<p>Смоделируем туже ситуацию и попробуем уничтожить датчик из двух орудий.</p>';

	}
}
