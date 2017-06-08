'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = ComplexLogicalExpressionOr();

var lodash = require('lodash');

/**
 * Created by vaimer on 20.05.2017.
 */
function ComplexLogicalExpressionOr() {

	var lessonTableColumns = ['||', 'true', 'false'];
	var lessonTableRows = [
		['<strong>true</strong>', 'true', 'true'],
		['<strong>false</strong>', 'true', 'false']
	];
	return {
		isRestartDisabled: true,
		title:             'Две палочки',
		video:	 	 {
			url: 'https://www.youtube.com/watch?v=2cGleL5FMZM',
			title: 'Немного условной теории.'
		},
		// Для урока с циклами
		// video:	 	 {
		// 	url: 'https://www.youtube.com/watch?v=fkmBbWkY4xw',
		// 	title: 'Как отправляет поздравления Марк Цукенберг?'
		// },
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
			// Логический оператор || (или) возвращает «true», если один или оба операнда возвращают «true»,
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [1, 2],
				hintRows: [0]
			}
		}, {
			audio: 'audio/lesson6/8-1',
			css:   'astromen-img',
			//  иначе возвращает «false».
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [2],
				hintRows: [1]
			}
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
			  '<li>Измените значение переменной <strong>isLaser1Ready</strong> на <span class="under-label">true</span>.</li>' +
			  '</ul>',

		instructions: '<ul>' +
					  '<li>Изучите комментарии к коду.</li>' +
					  '<li>Сделайте так, чтобы условие на <strong>13</strong> строчке было истинным.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(corvette) {

		var lessonResults = LessonResults({

			correct: '<p>На оружие полагаешься, н0 оружием нельзя выиграть сражение. </p>' +
					 '<p>Разум твой всего сильнее.</p>',

			unknownError: '<p>Что-т0 не так! Оружие не прошло проверку!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

			text: '<p>Вдарим р0к в этой дыре!</p> '
		});

		if (corvette.isFireAlreadyUsed()) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();

	}

	function content() {

		return '<p>Кадет сконцентрируйтесь. От пилота требуется следить за несколькими факторами одновременно.</p>' +
			'<p>В таких случаях используются логические операторы. Рассмотрим один из них.</p>' +
			'<p>Логический оператор <b>||</b> (или)  возвращает <b class="under-label">true</b>, ' +
			'если один или оба операнда возвращают <b class="under-label">true</b>, иначе возвращает <b class="under-label">false</b>. </p>' +
			'<p>Но в языке программирования <b>JavaScript</b> не все так просто, об этом вы узнаете в следующих уроках. </p>' +
			'<pre> ' +
			'<b>var</b> result = <b>op1</b> || <b>op2</b>;' +
			'</pre>' +
			'<p>Мы поставили датчик, аналогичный тому, который использовался при инциденте захвата корабля. Попробуйте уничтожить его.</p>';

	}
}
