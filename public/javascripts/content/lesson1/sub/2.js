'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = JavaScript();

let DiagramHelp = require('../../diagram.help');

/**
 * Урок - 'JavaScript'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function JavaScript() {

	let diagrama = function (graph) {

		let cycleCircle = DiagramHelp.createCircle({
													  x: 0,
													  y: 100,
													  width: 150,
													  height: 50,
													  text: 'Бесконечный цикл',
													  colorFill: '#152B39'
												  });

		let runBlock = DiagramHelp.createBlock({
												   x: 200,
												   y: 200,
												   text: 'Код управления',
												   colorFill: '#fe854f'
											   });

		graph.addCells([
						   cycleCircle,
						   runBlock
					   ]);

		let linkCycleToRun = DiagramHelp.createLink({
														graph: graph,
														source: cycleCircle,
														target: runBlock,
														isArrow: true
													});

		linkCycleToRun.set('vertices', [{ x: 200, y: 100 }]);

		let linkRunToCycle = DiagramHelp.createLink({
														graph: graph,
														source: runBlock,
														target: cycleCircle,
														isArrow: true
													});

		linkRunToCycle.set('vertices', [{ x: 0, y: 200 }]);
	};

	return {
		title:          'JavaScript',
		content:        content,
		// Справа показан пример управления транспортным кораблем с помощью JavaScript.
		// Функция run в бесконечном цикле последовательно раз за разом выполняет написанный код управления
		// в данном случае команду поворота налево.
		// Запустите код и увидите результат.
		instructions:   '<ul>' +
						'<li>Функция <span class="under-label">run</span> в бесконечном цикле последовательно, раз за разом, выполняет написанный код управления. Являтеся одной из самых важных функций SpaceCraft.</li>' +
						'<li>Больше информации о JavaScript: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Introduction">клац</a>.</li>' +
						'</ul>',
		character:      [{
			audio:  'audio/lesson2/2-1',
			css:    'astromen-img',
			video: {
				hide: true,
				url: 'https://www.youtube.com/watch?v=6jkOcZfYvZA',
				content: 'Что такое язык программирования? Расскажут мудрейшие из команды <b>Хекслет</b>.'
			}
		}, {
			audio:  'audio/lesson2/2-2',
			css:    'astrogirl-img',
			hint:   [
				{
					'next .ace_scroller': 'Пример управления транспортным кораблем',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}, {
			diagram: diagrama,
			audio:  'audio/lesson2/2-3',
			css:    'astrogirl-img',
			marker: {
				x1:   6,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/2-4',
			css:    'astrogirl-img',
			marker: {
				x1:   9,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/2-5',
			css:    'astrogirl-img',
			waitForHint: true,
			hint:   [
				{
					'click .enhoyhint-play': 'Запустите код',
					'nextButton':             false,
					'showSkip':               false
				}
			]
		}],
		gamePostUpdate: gamePostUpdate
	};

	function gamePostUpdate() {

		var lessonResults = LessonResults({
			correct: '<p>Кадет это функция run, функция run это кадет!</p>' +
					 '<p>Приятно познакомиться! </p>'
		});

		return lessonResults.resultCorrect();

	}

	function content() {

		return '<p>Все космические корабли нашего флота управляются с помощью древней земной технологии - <strong>JavaScript</strong>.</p>' +
			'<p><strong>JavaScript</strong> - язык программирования, который был создан в 1995, за 31 год до колонизации Марса компанией EnoSam.</p>' +
			'<p>Основная задача академии заключается в освоении кадетами данного инструмента.</p>'

	}

}
