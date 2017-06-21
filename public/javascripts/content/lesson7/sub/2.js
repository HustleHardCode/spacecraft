'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');
var CodeLauncher = require('../../../game/launcher');
var DiagramHelp = require('../../diagram.help');

var rhombus = DiagramHelp.createRhombus;
var block = DiagramHelp.block;
var blockWithSize = DiagramHelp.createBlock;
var createLink = DiagramHelp.createLink;

module.exports = IfOperation();

var lodash = require('lodash');

/**
 * Created by vaimer on 09.05.2017.
 */
function IfOperation() {

	return {
		isRestartDisabled: true,
		title:             'Уничтожать или не уничтожать?',
		character:         [{
			audio:   'audio/lesson2/1-1',
			css:     'astromen-img',
			diagram: function (graph) {
				var condition = rhombus({
					x:           225,
					y:           50,
					width:       150,
					height:      100,
					text:        '2 === 2 ?',
					colorFill:   '#fe854f',
					colorStroke: '#152b39'
				});

				var act1 = block(50, 200, 'Уничтожить', '#152B39');
				var link = createLink({graph: graph, target: act1, sourceX: 300, sourceY: 100});

				var labelBlock = blockWithSize({
					x:      150,
					y:      70,
					width:  30,
					height: 30,
					text:   'Да'
				});

				graph.addCells([
					condition,
					act1,
					labelBlock
				]);

				link.addTo(graph);
				link.toBack();

				link.set('vertices', [{x: 125, y: 100}]);
			},
			video:   {
				url:   'https://www.youtube.com/watch?v=kPe8Fojxh6k&index=4&list=PLJOe7BmEsRtLXM3UnEhvEWDU3ZBe-Us9r',
				content: 'Возможно знакомое вам лицо, назовем его Билл, об операторе <b>if</b>.'
			}
		}],
		gamePostUpdate:    gamePostUpdate,

		content: content,

		hint: '<ul>' +
			  '<li>Измените условие <strong>8</strong> строки на <span class="red-label">2 > 2</span>.</li>' +
			  '<li>Измените условие <strong>15</strong> строки на <span class="red-label">5 > 3</span>.</li>' +
			  '</ul>',

		instructions: '<ul>' +
					  '<li>Изучите комментарии к коду.</li>' +
					  '<li>Измените условие так, чтобы корабль не был уничтожен.</li>' +
					  '<li>Измените условие так, чтобы BBot вывел сообщение о состоянии систем корабля.</li>' +
					  '<li>Немного вкусняшек: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else">мням</a>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(corvette,
							statistics,
							text) {

		var lessonResults = LessonResults({

			correct: '<p>Где правда проступает сквозb туман,</p>' +
					 '<p>там терпит поражение 0бман....</p>' +
					 '<p>Ой, что это я. Транслирую:</p>' +
					 '<p class="bbot-output">' + text + '</p>',

			noInfo: '<p>Эй! Где л0гги корабля? Хватит халявить!</p>' +
					'<p>Внимательно про4итайте инструкции и попробуйте снова.</p>',

			unknownError: '<p>Что-то не так! Не могу найти заданный выв0д!</p>' +
						  '<p>Внимательно про4итайте инструкции и попробуйте снова.</p>',

			text: '<p>Создаю резервную копию.</p> ' +
				  '<p>Уничтожение системы через 3.. 2.. 1..</p>  ' +
				  '<p>Восстанавливаю системY из резервной копии.</p> ' +
				  '<p>Не делайте так больше. Ты разбиваешb мое металлическое сердце!</p>'
		});

		if (corvette.isAlive()) {

			if (text) {

				return lessonResults.resultCorrect();

			} else {

				return lessonResults.resultNotCorrect('noInfo');

			}

		} else {

			var lessonPoints = statistics.getLessonContentPoints();

			CodeLauncher.stop();

			// Устанавливаем штрафные очки за взрыв корабля :)
			statistics.incPenaltyPointsForGame(lessonPoints.shuttleDestroy);

			return lessonResults.text('bbot-wow');

		}
	}

	function content() {

		return '<p>Самое время познать искусство маленьких шагов, начнем с простого. В космосе бывают ситуации, когда, в зависимости от условий, ' +
			'необходимо выполнять определенные действия или принимать сложные решения.</p>' +
			'<p>Для этого был создан оператор <strong class=‘under-lable’>if</strong>, ' +
			'который позволяет определить условное выражение, возвращающее логический тип данных - <strong>boolean</strong>:</p>' +
			'<pre>if (<strong>условие</strong>)<br>' +
			'{<br>' +
			'    <strong>действия</strong><br>' +
			'}</pre>' +
			'<p>Если <strong>условие</strong> имеет значение <strong class=’under-lable’>true</strong> - «истина», то выполнятся заданные <strong>действия</strong>.</p>' +
			'<p>Смоделируем ситуацию: хитрый взломщик решил уничтожить корабль, изменив код модуля защиты. Ваша задача не допустить этого!</p>';

	}
}
