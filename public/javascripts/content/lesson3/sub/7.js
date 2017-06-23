'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = goToResearchCenter();

var lodash = require('lodash');

/**
 * Created by vaimer on 24.03.17.
 */
function goToResearchCenter() {

	return {
		isRestartDisabled: true,
		title:        'Пора исследовать',
		character:    [{
			audio:  'audio/lesson4/7-1',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson4/7-2',
			css:    'astromen-img',
			marker: {
				x1:   2,
				x2:   2,
				y1:   4,
				y2:   21,
				type: 'line'
			}
		},{
			audio:  'audio/lesson4/7-4',
			css:    'astromen-img'
		}, {
			audio: 'audio/lesson4/7-5',
			css:   'astrogirl-img',
			marker: {
				x1:   11,
				y2:   Infinity
			}
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
			  '<li>Добавьте <span class="red-label">researchContainer = harvester.unloadCargo();</span> на <strong>11</strong> строку.</li>' +
			  '</ul>',

		instructions: '<ul>' +
					  '<li>На строке <strong>11</strong> необходимо присвоить переменной <span class="red-label">researchContainer</span> ' +
					  'значение, возвращаемое командой <span class="red-label">harvester.unloadCargo()</span>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(harvester,
							lesson,
							text) {

		var lessonResults = LessonResults({

			correct: '<p>Подтверждаю выгрузку.</p>' +
					 '<p>Исследовтельским центром получен:</p>' +
					 '<p class="bbot-output">Вражеский датчик</p>',

			unknownError: '<p>Неизвестная ошибка!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

		});

		if (text &&
			harvester.isCargoUnload() &&
			harvester.isNearPoint(400, 2000) ) {

			return lessonResults.resultCorrect();

		}
	}

	function content() {

		return  '<p>Перед вами наш исследовательский центр. Все самые передовые разработки рождаются именно здесь.</p>' +
				'<p>Передайте ученым поднятый вами датчик: положите в контейнер <strong class="under-label">researchContainer</strong> ' +
			 	'значение с грузового отсека корабля.</p>' +
				'<p>Чтобы получить значение, хранимое в грузовом отсеке, используйте команду:</p>' +
				'<pre><strong>harvester</strong>.unloadCargo();</pre>' +
				'<p><strong>BBot</strong> сообщит вам об успешной погрузке.</p>';

	}
}
