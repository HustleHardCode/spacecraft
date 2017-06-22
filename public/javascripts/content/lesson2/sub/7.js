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

				let typeMain = block(0, 50, 'Типы данных', '#152B39');
				let type1 = block(175, 50, 'Объекты', '#152B39');
				let type2 = block(-175, 50, 'Простые типы', '#152B39');

				let type21 = block(-175, 135, 'Строки', '#fe854f');
				let type22 = block(-175, 220, 'Числа', '#fe854f');
				let type23 = block(-175, 305, 'Логический тип', '#fe854f');
				let type24 = block(-175, 390, 'null', '#fe854f');
				let type25 = block(-175, 475, 'undefined', '#fe854f');

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

				createLink({graph: graph, source: typeMain, target: type1, isArrow: true});
				createLink({graph: graph, source: typeMain, target: type2, isArrow: true});
				createLink({graph: graph, source: type2, target: type21});
				createLink({graph: graph, source: type21, target: type22});
				createLink({graph: graph, source: type22, target: type23});
				createLink({graph: graph, source: type23, target: type24});
				createLink({graph: graph, source: type24, target: type25});
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
