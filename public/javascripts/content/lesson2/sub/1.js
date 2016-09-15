'use strict';

var joint = require('jointjs');

module.exports = AcademyProgram();

/**
 * Урок - 'Программа академии';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function AcademyProgram() {

	return {
		title:        'Программа академии',
		defaultBBot:  defaultBBot,
		content:      content,
		// Похоже вас допустили к курсу учебных полетов. Ваш первый корабль - мелкая посудина.
		// Хах, а вы что думали? Вам доверят огромной технологичный крейсер?
		// Научитесь сначала управлять этим транспортником, а там уже и поговорим.
		// Только смотрите, не поцарапайте!
		instructions: '<ul>' +
					  '<li>Нажмите "Далее" для продолжения.</li>' +
					  '</ul>',
		character:    [{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img',
			diagram: function (graph) {

				var rect = new joint.shapes.basic.Rect({
					position: {x: 100, y: 30},
					size:     {width: 100, height: 30},
					attrs:    {rect: {fill: 'blue'}, text: {text: 'my box', fill: 'white'}}
				});

				var rect2 = rect.clone();
				rect2.translate(300);

				var link = new joint.dia.Link({
					source: {id: rect.id},
					target: {id: rect2.id}
				});

				graph.addCells([rect, rect2, link]);

			}
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		}]
	};

	function content() {

		return '<p>Приятно вас видеть, кадет!</p>' +
			'<p>Сегодня вам будет предоставлен первый урок программы подготовки пилота-инженера.</p>' +
			'<p>Программы, направленной на выпуск настоящих профессионалов, которые будут готовы выполнять поставленные задачи в любой части вселенной.</p>' +
			'<p>Что ж кратко поговорим о JavaScript и о том, что такое команды и комментарии.</p>'

	}

	function defaultBBot() {

		return '<p>Приветствую, 62 69 74 65 20 6d 79 20 73 68 69 6e 79 20 6d 65 74 61 6c 20 61 73 73...</p>' +
			'<p>Упс! Дройд BBot - рестарт...</p>'

	}
}