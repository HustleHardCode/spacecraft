'use strict';

var DiagramHelp = require('../../diagram.help.js');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = UndefinedNull();

/**
 * Урок - 'null и undefined';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function UndefinedNull() {

	return {
		title:             'Отсутствие',
		content:           content,
		defaultBBot:       defaultBBot,
		isRestartDisabled: true,
		instructions:      '<ul>' +
						   '<li>Нажмите «Далее» для продолжения.</li>' +
						   '<li>Для любознательных: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures#Булев_тип_null_и_undefined">клац</a>.</li>' +
						   '</ul>',
		character:         [{
			audio:   'audio/lesson3/7-1',
			css:     'astromen-img',
			hint:    [
				{
					'next .content-overflow .diagram-board': 'null и undefined',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			],
			diagram: function (graph) {

				var typeMain = block(225, 50, 'Типы данных', '#152B39');
				var type1 = block(400, 50, 'Объекты', '#152B39');
				var type2 = block(50, 50, 'Простые типы', '#152B39');

				var type21 = block(50, 135, 'Строки', '#fe854f');
				var type22 = block(50, 220, 'Числа', '#fe854f');
				var type23 = block(50, 305, 'Логический тип', '#fe854f');
				var type24 = block(50, 390, 'null', '#fe854f');
				var type25 = block(50, 475, 'undefined', '#fe854f');

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21,
					type22,
					type23,
					type24,
					type25
				]);

				createLink(graph, typeMain, type1);
				createLink(graph, typeMain, type2);
				createLink(graph, type2, type21);
				createLink(graph, type21, type22);
				createLink(graph, type22, type23);
				createLink(graph, type23, type24);
				createLink(graph, type24, type25);
			}
		}, {
			audio:  'audio/lesson3/7-2',
			css:    'astromen-img',
			marker: {
				x1: 4,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson3/7-3',
			css:    'astromen-img',
			marker: {
				x1: 7,
				y2: Infinity
			}
		}]
	};

	function content() {

		return '<p>Ключевое слово <span class="under-label"><strong>null</strong></span> и идентификатор <span class="under-label"><strong>undefined</strong></span> свидетельствует об отсутствии значения.</p>' +
			'<p>В чем же разница?</p>' +
			'<p><span class="under-label"><strong>null</strong></span> обозначает «ничего» или «значение неизвестно», <span class="under-label"><strong>undefined</strong></span> в свою очередь «значение не было задано».</p>';
	}

	function defaultBBot() {

		return '<p>Ничего особенного, идемте дальше.</p>'

	}

}
