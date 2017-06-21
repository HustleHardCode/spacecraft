'use strict';

var DiagramHelp = require('../../diagram.help.js');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = ObjectType();

/**
 * Урок - 'Объекты';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function ObjectType() {

	return {
		title:             'По ту сторону...',
		content:           content,
		defaultBBot:       defaultBBot,
		isRestartDisabled: true,
		instructions:      '<ul>' +
						   '<li>Нажмите «Далее» для продолжения.</li>' +
						   '<li>Хотите узнать больше о объектах? Вам сюда: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Working_with_Objects">клац</a>.</li>' +
						   '</ul>',
		character:         [{
			audio:   'audio/lesson3/8-1',
			css:     'astromen-img',
			hint:    [
				{
					'next .content-overflow .diagram-board': 'Виды объектов',
					'nextButton':                            {text: 'Далее'},
					'showSkip':                              false
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

				var type11 = block(400, 135, 'Специальные', '#fe854f');
				var type12 = block(400, 220, 'Обычные', '#fe854f');

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21,
					type22,
					type23,
					type24,
					type25,
					type11,
					type12
				]);

				createLink({graph: graph, source: typeMain, target: type1, isArrow: true});
				createLink({graph: graph, source: typeMain, target: type2, isArrow: true});
				createLink({graph: graph, source: type2, target: type21});
				createLink({graph: graph, source: type21, target: type22});
				createLink({graph: graph, source: type22, target: type23});
				createLink({graph: graph, source: type23, target: type24});
				createLink({graph: graph, source: type24, target: type25});
				createLink({graph: graph, source: type1, target: type11});
				createLink({graph: graph, source: type11, target: type12});
			}
		}, {
			audio: 'audio/lesson3/8-2',
			css:   'astromen-img',
			marker: {
				x1: 3,
				x2: 8,
				y2: Infinity
			}
		}]
	};

	function content() {

		return '<p>По разные стороны баррикад стоят простые типы и объектный тип данных.</p>' +
			'<p>Любое значение в языке <strong>JavaScript</strong>, не являющееся строкой, числом, логическим типом,' +
			'<strong>null</strong> или <strong>undefined</strong>, является <span class="under-label"><strong>объектом</strong></span>. ' +
			'Он представляет из себя набор свойств, каждое из которых имеет свое имя и значение.</p>' +
			'<p><strong>Более подробно объекты мы рассмотрим в следующих уроках.</strong></p>';

	}

	function defaultBBot() {

		return '<p>Железный зад BBot\'а - любимый объект BBot\'а!</p>'

	}

}
