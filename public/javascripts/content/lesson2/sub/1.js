'use strict';

var LessonResults = require('../../lesson-results');

// var DiagramHelp = require('../diagram.help');
// var block = DiagramHelp.block;
// var createLink = DiagramHelp.createLink;

module.exports = Investigation();

/**
 * Урок - 'Исследование места аварии';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Investigation() {

	return {
		title:        'Место аварии',
		content:      content,
		isRestartDisabled: true,
		instructions: '<ul>' +
					  '<li>Отправьте корабль к месту аварии с помощью команды <span class="red-label">scout.moveToXY()</span>.</li>' +
					  '<li>Координаты аварии (<strong>2000</strong>, <strong>2000</strong>).</li>' +
					  '</ul>',
		character:    [{
			audio:   'audio/lesson2/1-1.mp3',
			css:     'astromen-img',
			marker: {
				x1:   8,
				y2:   Infinity
			}

		}],

		gamePostUpdate: gamePostUpdate
	};

	function gamePostUpdate(scout) {

		var lessonResults = LessonResults({

			correct: '<p>Шерлок, корабль на месте преступления!</p>' +
					 '<p>Мы — разведчики в неприятельском лагере.</p>',

			text: '<p>Немного лайфхаков: если вы нажмете SPACE + ALT, выполнится автодополнение.</p>'

		});

		var x = 2000 - scout.getX();
		var y = 2000 - scout.getY();
		var d = Math.sqrt(x * x + y * y);

		if (d < 100)
		{
			return lessonResults.resultCorrect();
		}

		return lessonResults.text();

	}

	function content() {

		return '<p>Что ж, в связи с возникшей ситуацией, нам пришлось отойти от программы. Прошу вас держать всю информацию, которой вы обладаете, в тайне.</p>' +
			'<p>Нам необходимо провести расследование данного инцидента и вы нам в этом поможете.</p>' +
			'<p>Отправьте свой корабль к месту аварии, необходимо выполнить сканирование местности.</p>';

	}

}


//var typeMain = block(225, 50, 'Типы данных');
//var type1 = block(400, 50, 'Объекты');
//var type2 = block(50, 50, 'Простые типы');
//
//var type21 = block(50, 135, 'Числа', '#fe854f');
//var type22 = block(50, 220, 'Строки', '#fe854f');
//var type23 = block(50, 305, 'Логический тип', '#fe854f');
//var type24 = block(50, 390, 'null', '#fe854f');
//var type25 = block(50, 475, 'undefined', '#fe854f');
//
//var type11 = block(400, 135, 'Специальные', '#fe854f');
//var type12 = block(400, 220, 'Обычные', '#fe854f');
//
//graph.addCells([
//	typeMain,
//	type1,
//	type2,
//	type21,
//	type22,
//	type23,
//	type24,
//	type25,
//	type11,
//	type12
//]);
//
//createLink(graph, typeMain, type1);
//createLink(graph, typeMain, type2);
//createLink(graph, type2, type21);
//createLink(graph, type21, type22);
//createLink(graph, type22, type23);
//createLink(graph, type23, type24);
//createLink(graph, type24, type25);
//createLink(graph, type1, type11);
//createLink(graph, type11, type12);
// character:    [{
// 	audio:   'audio/lesson2/1-1.mp3',
// 	css:     'astromen-img',
// 	diagram: function (graph) {
//
// 		var typeMain = block(225, 50, 'Типы данных');
// 		var type1 = block(400, 50, 'Объекты');
// 		var type2 = block(50, 50, 'Простые типы');
//
// 		graph.addCells([
// 			typeMain,
// 			type1,
// 			type2
// 		]);
//
// 		createLink(graph, typeMain, type1);
// 		createLink(graph, typeMain, type2);
//
// 	}
// }, {
// 	audio: 'audio/lesson2/1-2.mp3',
// 	css:   'astrogirl-img'
// }]
