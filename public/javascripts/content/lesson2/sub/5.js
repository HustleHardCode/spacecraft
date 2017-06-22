'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var DiagramHelp = require('../../diagram.help.js');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = Numbers();

/**
 * Урок - 'Числа';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Numbers() {

	return {
		title:              'Миром правят цифры!',
		content:            content,
		isRestartDisabled:  true,
		instructions:       '<ul>' +
							'<li>Введите в редакторе кода число: <span class="under-label">1984</span>.</li>' +
							'<li>Больше информации о числах: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures#Числа">клац</a>.</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Введите число <span class="under-label-gray">1984</span> на <strong>22</strong> строке.</li>' +
							'</ul>',
		character:          [{
			audio:   'audio/lesson3/5-1',
			css:     'astromen-img',
			diagram: function (graph) {

				let typeMain = block(0, 50, 'Типы данных', '#152B39');
				let type1 = block(175, 50, 'Объекты', '#152B39');
				let type2 = block(-175, 50, 'Простые типы', '#152B39');

				let type21 = block(-175, 135, 'Строки', '#fe854f');
				let type22 = block(-175, 220, 'Числа', '#fe854f');

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21,
					type22
				]);

				createLink({graph: graph, source: typeMain, target: type1, isArrow: true});
				createLink({graph: graph, source: typeMain, target: type2, isArrow: true});
				createLink({graph: graph, source: type2, target: type21});
				createLink({graph: graph, source: type21, target: type22});
			}
		}, {
			audio:  'audio/lesson3/5-2',
			css:    'astromen-img',
			marker: {
				x1: 5,
				y2: Infinity
			},
		}, {
			audio:  'audio/lesson3/5-3',
			css:    'astromen-img',
			marker: {
				x1: 8,
				y2: Infinity
			},
		}, {
			audio:  'audio/lesson3/5-4',
			css:    'astromen-img',
			marker: {
				x1: 11,
				y2: Infinity
			},
		}, {
			audio:  'audio/lesson3/5-5',
			css:    'astromen-img',
			marker: {
				x1: 15,
				y2: Infinity
			},
			video:  {
				url:     'https://www.youtube.com/watch?v=hfUm8MZzN90',
				content: 'Архивное видео команды <b>Хекслет</b> о специальных значениях, ' +
						 'найденное во всемирной базе знаний.'
			}
		}, {
			audio:  'audio/lesson3/5-6',
			css:    'astromen-img',
			marker: {
				x1: 19,
				y2: Infinity
			},
		}, {
			audio: 'audio/lesson3/5-7',
			css:   'astrogirl-img',
			hint:  [
				{
					'next .ace_scroller': 'Введите в редакторе кода число: <strong>1984</span>',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p><span class="under-label"><strong>Number</strong></span> - числа, с помощью которых ваш корабль будет выполнять основные вычисления. Заметим, что числа пишутся без кавычек.</p>' +
			'<p>В <strong>JavaScript</strong> нет различий между целыми и вещественными значениями.</p>' +
			'<p>Шестнадцатиричные начинаются с префикса <span class="under-label"><strong>0x</strong></span>.</p>' +
			'<p>При делении на ноль, <strong>JavaScript</strong> выдаст специальное числовое значение - <span class="under-label"><strong>Infinity</strong></span>,' +
			'а не новую черную дыру, как вы могли подумать.</p>' +
			'<p>Другое специальное числовое значение - <span class="under-label"><strong>NaN</strong></span>, возвращается при ошибках в математических вычислениях.</p>'
	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>Всё сущее естb числ0! Транслирую:</p>' +
					 '<p class="bbot-output">' + value + '</p>',

			unknownError: '<p>4 8 15 16 23 42...</p>' +
						  '<p>Ответ на вопрос недопустим!</p>' +
						  '<p>Побробуйте ввести более короткое число, допустим 451.</p>'
		});

		// Если выброшено исключение
		if (value && value.exception) {

			return lessonResults.unknownError();

		}

		// Проверка числа
		return lessonResults.result(value === 1984 || value === 451);

	}

}
