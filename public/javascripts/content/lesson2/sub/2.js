'use strict';

var LessonResults = require('../../lesson-results');

module.exports = Scanning();

/**
 * Урок - 'Сканирование места аварии';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Scanning() {

	return {
		title:        'Место аварии',
		content:      content,
		isRestartDisabled: true,
		instructions: '<ul>' +
					  '<li>Включите сканирование с помощью команды: <span class="red-label">scout.scan()</span>.</li>' +
					  '</ul>',
		character:    [{
			audio:   'audio/lesson2/1-1.mp3',
			css:     'astromen-img',
			marker: {
				x1:   8,
				y2:   Infinity
			}

		}],
		gamePostUpdate: gamePostUpdate
	};

	function gamePostUpdate(scout) {

		var lessonResults = LessonResults({
			correct: '<p>Начинаю сканирование местности!</p>'
		});

		if (scout.isScanningActivated()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Мы на месте. Включите сканирование нам необходимо найти следы взломщиков.</p>' +
			'<p>Это может занять некоторое время.</p>';

	}

}
