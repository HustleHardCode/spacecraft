'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var DiagramHelp = require('../../diagram.help.js');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = Booleans();

/**
 * Урок - 'Логический тип';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Booleans() {

	return {
		title:              'Истина, ложь, ложь…',
		content:            content,
		isRestartDisabled:  true,
		instructions:       '<ul>' +
							'<li>Введите логическое выражение, при котором система должна вернуть <span class="under-label">true</span>.</li>' +
							'<li>Для любознательных: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures#Булев_тип_null_и_undefined">клац</a>.</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Введите выражение <span class="under-label-gray">2 > 1</span> на <strong>7</strong> строке.</li>' +
							'</ul>',
		character:          [{
			audio: 'audio/lesson3/6-1',
			css:   'astromen-img'
		}, {
			audio:   'audio/lesson3/6-2',
			css:     'astromen-img',
			hint:    [
				{
					'next .content-overflow .diagram-board': 'Логический тип данных',
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

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21,
					type22,
					type23
				]);

				createLink({graph: graph, source: typeMain, target: type1, isArrow: true});
				createLink({graph: graph, source: typeMain, target: type2, isArrow: true});
				createLink({graph: graph, source: type2, target: type21});
				createLink({graph: graph, source: type21, target: type22});
				createLink({graph: graph, source: type22, target: type23});
			}
		}, {
			audio:  'audio/lesson3/6-3',
			css:    'astromen-img',
			marker: {
				x1: 3,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson3/6-4',
			css:    'astromen-img',
			marker: {
				x1: 4,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson3/6-5',
			css:    'astrogirl-img',
			hint:   [
				{
					'next .ace_scroller': 'Введите логическое выражение, возвращающее <strong>true</strong>',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p>Космос суров, здесь полно лжи. Никому не верьте! Любое высказывание необходимо проверять на правдивость!</p>' +
			'<p>Единственный, кто вас никогда не подведет - ваш корабль.</p>' +
			'<p><span class="under-label"><strong>Boolean</strong></span> - это логический тип данных, который может принимать значения <span class="under-label">true</span>, либо <span class="under-label">false</span>. Как вы уже наверно догадались - «истина» и «ложь» соответственно.' +
			'<p>Например, сравнение двух чисел может вернуть либо <span class="under-label-gray">true</span>, либо <span class="under-label-gray">false</span>:</p>' +
			'<pre>5 > 4 - <strong>true</strong></pre>' +
			'<pre>4 > 5 - <strong>false</strong></pre>'
	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>В каждой шутке естb доля шутки! Транслирую:</p>' +
					 '<p class="bbot-output">' + value + '</p>',

			unknownError: '<p>Истина не найдена! Где же она?</p>' +
						  '<p>Пох0же вы не разобрались с логическим типом.</p>'
		});

		// Если выброшено исключение
		if (value && value.exception) {

			return lessonResults.unknownError();

		}

		// Проверка на true
		return lessonResults.result(value);

	}

}
