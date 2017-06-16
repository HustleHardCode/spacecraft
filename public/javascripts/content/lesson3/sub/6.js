'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = goToResearchCenter();

/**
 * Created by vaimer on 23.03.17.
 */
function goToResearchCenter() {

	return {
		isRestartDisabled: true,
		runOnStart:        true,
		title:             'К исследовательскому центру',
		character:         [{
			audio: 'audio/lesson4/6-1',
			css:   'astromen-img',
			video: {
				url: 'https://www.youtube.com/watch?v=AkBJEc1BpDE',
				content: 'Видео старейшин программирования - команды <strong>Хекслет</strong>, найденное BBot\'ом в архиве времени.'
			}
		}, {
			audio:  'audio/lesson4/6-2',
			css:    'astromen-img',
			marker: {
				x1: 2,
				x2: 3
			}
		}, {
			audio:  'audio/lesson4/6-3',
			css:    'astromen-img',
			marker: {
				x1:   3,
				x2:   3,
				y1:   0,
				y2:   5,
				type: 'line'
			}
		}, {
			audio:  'audio/lesson4/6-4',
			css:    'astromen-img',
			marker: {
				x1:   3,
				x2:   3,
				y1:   16,
				y2:   20,
				type: 'line'
			}
		}, {
			audio:       'audio/lesson4/6-5',
			css:         'astromen-img',
			waitForHint: true,
			hint:        [{
				'next .ace_scroller': 'Вы еще не забыли о <b>undefined</b> и <b>null</b>?',
				'nextButton':         {text: 'Нет!'},
				'showSkip':           false
			}]
		}, {
			audio: 'audio/lesson4/6-6',
			css:   'astromen-img',
			marker: {
				x1: 7,
				y2: Infinity
			}
		}, {
			audio: 'audio/lesson4/6-7',
			css:   'astromen-img',
			marker: {
				x1: 11,
				y2: Infinity
			}
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
					  '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '<li>Информация по ключевому слову <strong>const</strong>: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/const">чпоньк</a>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(harvester) {

		var lessonResults = LessonResults({

			correct: '<p>Прощай прекрасный датчик!</p>' +
					 '<p>Твой к0д логичен и прост.</p>' +
					 '<p>А говорят, что робот не может любить.</p>',

			unknownError: '<p>Неизвестная ошибка!</p>' +
						  '<p>Вам не0бходимо прибыть к иследовательсному центру.</p>' +
						  '<p>Координаты: 400, 2000.</p>',

			text: '<p>Следуйте за белым кроликом!</p>'
		});

		if (harvester.isNearPoint(400, 2000)) {

			return lessonResults.resultCorrect('bbot-wow');

		}

		return lessonResults.text();
	}

	function content() {

		return '<p>Проведем время в полете с пользой: поговорим о других особенностях работы с переменными.</p>' +
			'<p>Существуют переменные, значения которых <span class="under-label">никогда</span> не меняются. ' +
			'Пилоты называют их константами и, как правило, пишут имена таких переменных заглавными буквами. ' +
			'Константы объявляются с помощью ключевого слова <strong>const</strong>, а значение константы задается ' +
			'<span class="under-label">сразу</span>, при ее объявлении.</p>' +
			'<p>Вы еще не забыли о <strong class="under-label">undefined</strong> и <strong class="under-label">null</strong>?</p>' +
			'<p>Переменные, которым не присволили значения, будут хранить идентификатор <strong>undefined</strong>. ' +
			'Для обозначения неизвестного значения переменной используется специально слово <strong>null</strong>.</p>';

	}
}
