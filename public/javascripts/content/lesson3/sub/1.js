'use strict';

var DiagramHelp = require('../../diagram.help');

var block = DiagramHelp.createBlock;

module.exports = FirstContactWithVariables();

/**
 * Created by vaimer on 31.01.17.
 */
function FirstContactWithVariables() {

	return {
		isRestartDisabled: true,
		title:             'Где все хранить?',
		character:         [{
			audio: 'audio/lesson4/1-1',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson4/1-2',
			css:   'astromen-img'
		}, {

			audio:   'audio/lesson4/1-3',
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
					width:       100,
					height:      50,
					colorFill:   '#152b39',
					colorStroke: '#152b39'
				});

				variables.embed(value);

				graph.addCells([
					variables,
					value
				]);
			},
			hint:    [
				{
					'next .content-overflow .diagram-board': 'Именованный контейнер',
					'nextButton':                            {text: 'Далее'},
					'showSkip':                              false
				}
			]
		}, {
			audio:  'audio/lesson4/1-4',
			css:    'astromen-img',
			marker: {
				x1: 4,
				x2: 4,
				y1: 0,
				y2: 3,
				type: 'line'
			}
		}, {
			audio:  'audio/lesson4/1-5',
			css:    'astromen-img',
			marker: {
				x1: 4,
				x2: 4,
				y1: 4,
				y2: 14,
				type: 'line'
			}
		}],

		content: content,

		defaultBBot: defaultBBot,

		instructions: '<ul>' +
					  '<li>Нажмите «Далее» для продолжения.</li>' +
					  '<li>Узнать больше о ключевом слове <strong>var</strong>: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/var">клик</a>.</li>' +
					  '</ul>'
	};

	function content() {

		return '<p>Рад снова вас видеть, кадет. Вам необходимо перевести датчик в исследовательский центр. ' +
			'Чтобы выполнить задание, вам потребуется изучить некоторые возможности работы с информацией. Приступим.</p>' +
			'<p>Для хранения данных в <strong>JavaScript</strong> используются <strong>переменные</strong>. ' +
			'Так что же это такое? По сути это именованные контейнеры, которые хранят различные значения.</p>' +
			'<p>Переменные объявляются или другими словами создаются с помощью ключевого слова <strong class="under-label">var</strong>. ' +
			'После следует имя переменной, которое может состоять из букв, цифр, символов <strong>$</strong> и <strong>_</strong> , ' +
			'но не должно начинаться с цифры.</p>';

	}

	function defaultBBot() {

		return '<p>Проснись, кадет...</p>';

	}
}
