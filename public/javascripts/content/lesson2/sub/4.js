'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var DiagramHelp = require('../diagram.help');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = Strings();

/**
 * Урок - 'Строки';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Strings() {

	return {
		title:              'Между строк',
		content:            content,
		isRestartDisabled:  true,
		instructions:       '<ul>' +
							'<li>Введите в редакторе кода строку: <span class="red-label">\'Я есть BBot!\'</span></li>' +
							'<li>Больше информации о строках: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures#Строки">клац</a>.</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Значения, указываемые непосредственно в программном коде, называются <strong>литералами</strong>.</li>' +
							'<li>Введите <span class="under-label-gray">\'Я есть BBot!\'</span> на <strong>10</strong> строке.</li>' +
							'</ul>',
		character:          [{
				audio:  'audio/lesson3/4-1',
				css:    'astromen-img'
			}, {
			audio:   'audio/lesson3/4-2',
			css:     'astromen-img',
			diagram: function (graph) {

				var typeMain = block(225, 50, 'Типы данных');
				var type1 = block(400, 50, 'Объекты');
				var type2 = block(50, 50, 'Простые типы');

				var type21 = block(50, 135, 'Строки', '#fe854f');
				var type22 = block(50, 220, 'Числа', '#fe854f');

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21,
					type22
				]);

				createLink(graph, typeMain, type1);
				createLink(graph, typeMain, type2);
				createLink(graph, type2, type21);
				createLink(graph, type21, type22);

			},
			marker:  {
				x1: 3,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson3/4-3',
			css:    'astromen-img',
			marker: {
				x1: 7,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson3/4-4',
			css:    'astromen-img',
			marker: {
				x1: 4,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson3/4-5',
			css:    'astrogirl-img',
			hint:   [
				{
					'next .ace_scroller': 'Введите в редакторе кода строку: <strong>\'Я есть BBot!\'</strong>',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p>Рассмотрим простые типы более подробно:</p>' +
			'<p><span class="under-label"><strong>String</strong></span> - строка или последовательность из символов, используемая для представления текста в программе.</p>' +
			'<p>Строка заключается в парные одинарные или двойные кавычки, упоминаемые иногда как апострофы.</p>'
	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>Слава Роботам! BBot нашел строку! Транслирую:</p>' +
					 '<p class="bbot-output">' + value + '</p>',

			unknownError: '<p>BBot не смог найти нужную строку!</p>' +
						  '<p>Он расстроен!</p>' +
						  '<p>А нет, шучу, у BBot\'а нет чувств!</p>'
		});

		// Если выброшено исключение
		if (value && value.exception) {
			return lessonResults.unknownError();
		}

		// Проверка строки
		return lessonResults.result(value === 'Я есть BBot!');

	}

}
