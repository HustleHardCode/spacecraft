'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var DiagramHelp = require('../../diagram.help');

var block = DiagramHelp.createBlock;
var createLink = DiagramHelp.createLink;

var lodash = require('lodash');

module.exports = MoreAboutVariables();

/**
 * Created by vaimer on 19.02.2017.
 */
function MoreAboutVariables() {

	return {
		isRestartDisabled: true,
		title:             'Копирование',
		character:         [{
			audio:  'audio/lesson4/3-1',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson4/3-2',
			css:    'astromen-img',
			marker: {
				x1: 1,
				x2: 5
			}
		}, {
			audio:  'audio/lesson4/3-3',
			css:    'astromen-img',
			marker: {
				x1: 9,
				y2: Infinity
			}
		}, {
			audio:   'audio/lesson4/3-4',
			css:     'astromen-img',
			diagram: function (graph) {

				var variables1 = block({
					x:           50,
					y:           50,
					width:       200,
					height:      150,
					text:        'container',
					colorFill:   '#0a151c',
					colorStroke: '#152b39'
				});

				var value1 = block({
					x:           100,
					y:           150,
					width:       100,
					height:      50,
					text:        'Нога робота',
					colorFill:   '#152b39',
					colorStroke: '#152b39'
				});

				var variables2 = block({
					x:           350,
					y:           50,
					width:       200,
					height:      150,
					text:        'Container',
					colorFill:   '#0a151c',
					colorStroke: '#152b39'
				});

				var value2 = block({
					x:           400,
					y:           150,
					width:       100,
					height:      50,
					text:        'Нога робота',
					colorFill:   '#152b39',
					colorStroke: '#152b39'
				});

				variables1.embed(value1);
				variables2.embed(value2);

				graph.addCells([
					variables1,
					value1,
					variables2,
					value2
				]);

				createLink({graph:graph, source: value1, target: value2});
			},
			marker: {
				x1: 12,
				y2: Infinity
			},
			hint:  [
				{
					'next .content-overflow .diagram-board': 'Копирование значений переменной',
					'nextButton':                            {text: 'Далее'},
					'showSkip':                              false
				}
			],
			waitForHint: true
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '<li>Больше информации о переменных в <strong>JavaScript</strong>: <a href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/JavaScript_basics#Переменные">клац</a>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var v1 = '';
		var v2 = '';

		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				if (lodash.isNil(e)) {

					v1 += e;

				} else {

					v2 += e;

					r = (e === 'Нога робота');
				}

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Кто-т0 спёр мою робоногу!</p>' +
					 '<p>Так, так, так, что тут у нас?</p>' +
					 '<p class="bbot-output">' + v1 + '</p>' +
					 '<p class="bbot-output">' + v2 + '</p>' +
					 '<p>Кадет! Это не смешно!</p>',

			unknownError: '<p>Кто-то украл мою ногу!</p>'

		});

		if (r) {

			return lessonResults.resultCorrect('bbot-angry');

		}

		return lessonResults.unknownError();
	}

	function content() {

		return '<p>В <strong>JavaScript</strong> регистр имеет значение. <strong>container</strong> и <strong>Container</strong> две разные переменные.</p>' +
			'<p>Если переменная не инициализирована, то ее значение будет равно <strong class="under-label">undefined</strong>.</p>' +
			'<p>Значение одной переменной можно скопировать в другую переменную.</p>';

	}
}
