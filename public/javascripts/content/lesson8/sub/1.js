'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 04.06.17
 */

const LessonResults = require('../../lesson-results');

module.exports = For();

function For() {

	return {
		isRestartDisabled:  true,
		title:              'Повторяя, повторяй',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:       '<ul>' +
							'<li>Для запуска кода нажмите, в правом верхнем углу, ' +
							'на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
							'</ul>'
	};

	function content() {

		return '<p>На практике, у пилота очень часто возникает необходимость выполнить ' +
			   'несколько раз одну и туже последовательность команд. ' +
			   'Например, вот таким нехитрым образом, можно три раза вывести фразу <span class="under-label">\'BBot самый надоедливый робот в этой вселенной\'</span>.<p>' +
			   '<pre>' +
			   '<b>BBotDebug</b>(\'BBot самый надоедливый робот в этой вселенной\');<br>' +
			   '<b>BBotDebug</b>(\'BBot самый надоедливый робот в этой вселенной\');<br>' +
			   '<b>BBotDebug</b>(\'BBot самый надоедливый робот в этой вселенной\');' +
			   '</pre>' +
			   '<p>Не сложно, правда? А что, если вы захотите продублировать этот текст триста раз? ' +
			   'Похоже у вас возникают сложности? К счастью, использование циклов решает вашу проблему. ' +
			   'Например вот так:</p>' +
			   '<pre>' +
			   '<b>for</b>(<b>var</b> i = 0; i < 300; i++) <br>{ <br>' +
			   '    <b>BBotDebug</b>(\'BBot самый надоедливый робот в этой вселенной\');<br>' +
		       '}' +
			   '</pre>' +
			   '<p>Страшно? Не дрейфьте! В этом уроке мы подробно расскажем о трех основных операторах циклах языка <b>JavaScript</b>, ' +
			   'каждый из которых может помочь вам в организации повторного выполнения команд.</p>';

	}

	function interpreterHandler(value) {

		var lessonResults = {

			correct: '<p>Я могу повторять это до бесконечности:</p>' +
					 '<p class="bbot-output">{{correctText}}</p>',

			unknownError: '<p>Кажется кадет кое-что потерял.</p>'

		};

		return LessonResults(lessonResults)
			.resultsWrapper(value);
	}

}

