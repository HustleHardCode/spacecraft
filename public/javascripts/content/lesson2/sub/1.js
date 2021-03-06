'use strict';

var LessonResults = require('../../lesson-results');

module.exports = Investigation();

/**
 * Урок - 'Исследование места аварии';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Investigation() {

	return {
		title:             'Место аварии',
		content:           content,
		isRestartDisabled: true,
		instructions:      '<ul>' +
						   '<li>Отправьте корабль к месту аварии с помощью команды <span class="red-label">scout.moveToXY()</span>.</li>' +
						   '<li>Координаты аварии (<strong>2000</strong>, <strong>2000</strong>).</li>' +
						   '</ul>',
		hint:              '<ul>' +
						   '<li>Добавьте <span class="red-label">scout.moveToXY(2000, 2000);</span> на <strong>8</strong> строку.</li>' +
						   '</ul>',
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}, {
			audio:       'audio/lesson3/1-2',
			css:         'astromen-img',
			marker:      {
				x1: 8,
				y2: Infinity
			}
		}, {
			audio: 'audio/lesson3/1-3',
			css:   'astrogirl-img',
			hint:  [
				{
					'next .vk-hint': 'Есть вопросы?',
					'nextButton':    {text: 'Далее'},
					'showSkip':      false
				}
			]
		}, {
			audio: 'audio/lesson3/1-4',
			css:   'astrogirl-img',
			hint:  [
				{
					'next .disqus-hint': 'Спишитесь с другими кадетами',
					'nextButton':        {text: 'Далее'},
					'showSkip':          false
				}
			]
		}, {
			audio:       'audio/lesson3/1-5',
			css:         'astrogirl-img',
			waitForHint: true,
			hint:        [{
				'click .lesson-alt-hint': 'Нажмите для получения инструкций',
				'nextButton':             false,
				'showSkip':               false
			}]
		}],

		gamePostUpdate: gamePostUpdate
	};

	function gamePostUpdate(scout) {

		var lessonResults = LessonResults({

			correct: '<p>Шерлок, кораблb на месте преступления!</p>' +
					 '<p>Мы — разведчики в неприятельском лагере.</p>',

			text: '<p>Немного лайфхаков: если вы нажмете SPACE + CTRL, выполнится автодополнение.</p>'

		});

		if (scout.distanceTo(2000, 2000) < 100) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();

	}

	function content() {

		return '<p>Что ж, в связи с возникшей ситуацией, нам пришлось отойти от программы. Прошу вас держать всю информацию, которой вы обладаете, в тайне.</p>' +
			'<p>Необходимо провести расследование данного инцидента и вы нам в этом поможете.</p>' +
			'<p>Отправьте корабль-разведчик к месту аварии. Вы должны выполнить сканирование местности.</p>';

	}

}
