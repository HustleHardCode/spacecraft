'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = TaskWithVariables();

/**
 * Created by vaimer on 19.02.2017.
 */
function TaskWithVariables() {

	return {
		isRestartDisabled: true,
		title:             'Проверим ваши знания',
		character:         [{
			audio: 'audio/lesson4/4-1',
			css:   'astromen-img'
		},{
			audio: 'audio/lesson4/4-2',
			css:   'astrogirl-img',
			marker: {
				x1:   3,
				y2:   Infinity
			}
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  '<li>На <strong>3</strong> строке объявите переменную <span class="red-label">container</span>, с помощью ключевого слова <span class="under-label">var</span>.</li>' +
					  '<li>Задайте переменной значение <span class="under-label">\'Ионная пушка\'</span>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var value = '';
		var result = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				value += e;

				result = (e === 'Ионная пушка');

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Существует каверзный вопрос:</p>' +
					 '<p>Что обращает людей в пепел?</p>' +
					 '<p class="bbot-output">' + value + '</p>',

			unknownError: '<p>Неизвестная ошибка!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

			isNotCorrect: '<p>Не забирайте у BBot\'a игрушку!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>'

		});

		if (result) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.resultNotCorrect('isNotCorrect');

	}

	function content() {

		return '<p>Выполните небольшое задание, чтобы проверить понимание усвоенного материала.</p>';

	}
}
