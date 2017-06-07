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
		title:              'Повторяя повторяй',
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
			   'BBotDebug(\'BBot самый надоедливый робот в этой вселенной\');<br>' +
			   'BBotDebug(\'BBot самый надоедливый робот в этой вселенной\');<br>' +
			   'BBotDebug(\'BBot самый надоедливый робот в этой вселенной\');' +
			   '</pre>' +
			   '<p>Не сложно, правда? А что, если вы захотите продублировать этот текст триста раз? ' +
			   'Похоже у вас возникают сложности? К счастью, использование циклов решает вашу проблему. ' +
			   'Например вот так:</p>' +
			   '<pre>' +
			   'for(var i = 0; i < 300; ++i) <br>{ <br>' +
			   '    BBotDebug(\'BBot самый надоедливый робот в этой вселенной\');<br>' +
		       '}' +
			   '</pre>' +
			   '<p>В языке программирования <strong>JavaScript</strong> существует <strong>3</strong> основных оператора циклов ' +
			   '<span class="under-label"><strong>for</strong></span>, <span class="under-label"><strong>while</strong></span> ' +
			   'и <span class="under-label"><strong>do... while</strong></span>. ' +
			   'Каждый из которых может помочь вам в организации повторного выполнения определенных строк кода. </p>';

	}

	function interpreterHandler(value) {

		var lessonResults = {

			correct: '<p>Я могу повторять это до бесконечности:</p>' +
			'<p class="bbot-output">{{correctText}}</p>',

			unknownError: '<p>Кажется кадет кое-что потерял.</p>'

		};

		return LessonResults(lessonResults).resultsWrapper(value);
	}

}

