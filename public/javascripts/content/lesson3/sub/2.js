'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var DiagramHelp = require('../../diagram.help');

var block = DiagramHelp.createBlock;

module.exports = VariablesIsContainers();

/**
 * Created by vaimer on 19.02.2017.
 */
function VariablesIsContainers() {

	return {
		isRestartDisabled: true,
		title:             'Контейнер',
		character:         [{
			audio:  'audio/lesson4/2-1',
			css:    'astromen-img',
			marker: {
				x1: 4,
				y2: Infinity
			}
		}, {
			audio:   'audio/lesson4/2-2',
			css:     'astromen-img',
			diagram: function (graph) {

				let variables = block({
					x:           0,
					y:           100,
					width:       200,
					height:      150,
					text:        'container1',
					colorFill:   '#0a151c',
					colorStroke: '#152b39'
				});

				let value = block({
					x:           0,
					y:           150,
					width:       130,
					height:      50,
					text:        'Ракетное топливо',
					colorFill:   '#152b39',
					colorStroke: '#152b39'
				});

				variables.embed(value);

				graph.addCells([
					variables,
					value
				]);
			},
			marker:  {
				x1: 8,
				y2: Infinity
			}
		}, {
			audio:   'audio/lesson4/2-3',
			css:     'astromen-img',
			marker:  {
				x1: 11,
				y2: Infinity
			}
		},{
			audio:   'audio/lesson4/2-4',
			css:     'astromen-img',
			marker:  {
				x1: 15,
				y2: Infinity
			}
		}],

		interpreterHandler: interpreterHandler,


		content: content,

		instructions: '<ul>' +
					  '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '<li>Еще больше информации об объявлении: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Объявления">жмак</a>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var t = '';
		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				t += e + '</br>';

				r = (e === 'Капсула с галактическим червем' || e === 'Ракетное топливо');

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Открываю короб0чки... Что у нас тут?</p>' +
					 '<p>Транслирую:</p>' +
					 '<p class="bbot-output">' + t + '</p>',

			unknownError: '<p>Кто-то вскрыл контейнеры до нас!</p> ' +
						  '<p>И похитил Галактического червя и Ракетное топливо</p>'

		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.unknownError();
	}

	function content() {

		return '<p>В предыдущем, мы создали переменную <strong>container1</strong>. Теперь можно задать ей некоторое значение или, другими словами, инициализовать:</p>' +
			'<pre><strong>container1</strong> = \'Ракетное топливо\';</pre>' +
			'<p>Это значение в дальнейшем будет доступно при обращении по имени переменной.</p>' +
			'<p>Для краткости объявление и инициализацию можно записать на одной строке:</p> ' +
			'<pre>var <strong>container2</strong> = \'Капсула с галактическим червем\';</pre>' +
			'<p>Такую операцию пилоты называют <strong>определением</strong> переменной.</p>';
	}
}

