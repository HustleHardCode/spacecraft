'use strict';

var DiagramHelp = require('../../diagram.help.js');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = Sensor();

/**
 * Урок - 'Взлом датчика';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Sensor() {

	let typeMain = block(0, 50, 'Типы данных', '#152B39');
	let type1 = block(175, 50, 'Объекты', '#152B39');
	let type2 = block(-175, 50, 'Простые типы', '#152B39');

	let type21 = block(-175, 135, 'Строки', '#fe854f');
	let type22 = block(-175, 220, 'Числа', '#fe854f');

	return {
		title:             'Много, много типов',
		defaultBBot:       defaultBBot,
		content:           content,
		isRestartDisabled: true,
		instructions:      '<ul>' +
						   '<li>Нажмите «Далее» для продолжения.</li>' +
						   '<li>Больше информации о типах данных: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures">клац</a>.</li>' +
						   '</ul>',
		character:         [{
			audio: 'audio/lesson3/3-1',
			css:   'astromen-img'
		}, {
			audio:       'audio/lesson3/3-2',
			css:         'astromen-img',
			waitForHint: true,
			diagram:     function (graph) {

				graph.addCells([
					typeMain
				]);

			},
			hint:        [
				{
					'next .content-overflow .diagram-board': 'Категории типов данных',
					'nextButton':                            {text: 'Далее'},
					'showSkip':                              false
				}
			]
		}, {
			audio: 'audio/lesson3/3-3',
			css:   'astromen-img'
		}, {
			audio:   'audio/lesson3/3-4',
			css:     'astromen-img',
			diagram: function (graph) {

				graph.addCells([
					type1
				]);

				createLink({graph: graph, source: typeMain, target: type1, isArrow: true});

			}
		}, {
			audio:   'audio/lesson3/3-5',
			css:     'astromen-img',
			diagram: function (graph) {

				graph.addCells([
					type2
				]);

				createLink({graph: graph, source: typeMain, target: type2, isArrow: true});
			}
		}, {
			audio:   'audio/lesson3/3-6',
			css:     'astromen-img',
			diagram: function (graph) {

				graph.addCells([
					type21,
					type22
				]);

				createLink({graph: graph, source: type2, target: type21});
				createLink({graph: graph, source: type21, target: type22});
			},
			marker:  {
				x1: 5,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson3/3-7',
			css:    'astromen-img',
			marker: {
				x1: 8,
				y2: Infinity
			}
		}, {
			audio: 'audio/lesson3/3-8',
			css:   'astrogirl-img',
			hint:  [
				{
					'next .content-overflow .diagram-board': 'Диаграмма типов данных',
					'nextButton':                            {text: 'Далее'},
					'showSkip':                              false
				}
			]
		}, {
			audio: 'audio/lesson3/3-9',
			css:   'astrogirl-img',
			hint:  [
				{
					'next .diagram-hint': 'Нажмите, чтобы скрыть диаграмму',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}]
	};

	function defaultBBot() {

		return '<p>Взломатb можно все, особенно если это придумано человеком.</p>' +
			'<p>Даже BBot\'а! Вот отст0й.</p>'

	}

	function content() {

		return '<p>Сканер обнаружил датчик. Сейчас мы проведем анализ его систем и попробуем получить необходимые данные.</p>' +
			'<p>Пока происходит взлом, кратко ознакомимся с типами данных.</p>' +
			'<p><strong>JavaScript</strong> определяет две категории типов данных: <span class="under-label">объекты</span> и <span class="under-label">простые типы</span>.</p>' +
			'<p>Простые типы нам уже частично знакомы - это строка и число.</p>';
	}

}
