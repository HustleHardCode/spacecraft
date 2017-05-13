'use strict';

module.exports = Hook();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function Hook() {

	return {
		isRestartDisabled:  true,
		defaultBBot:        defaultBBot,
		title:              'Зацепка',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:       '<ul>' +
							'<li>Нажмите «Далее» для продолжения.</li>' +
							'</ul>',
	};

	function content() {

		return '<p>Исследователи нашего центра нашли интересную зацепку: датчик похоже был оставлен ' +
			'кораблем класса <strong>EBON HAWK</strong>. Ближайший зарегистрированный нами корабль такого ' +
			'типа находиться в одном парсеке от базы академии рядом с планетой <strong>Явавин</strong>. Возможно ' +
			'владелец данного корабля является хакером, взломавшим наши системы. Хм...</p>' +
			'<p>Сильное заявление, проверять я его конечно не буду! Вместо меня тут полетите вы и найдете ' +
			'капитана корабля. Но перед этим вы должны подготовиться.</p>';

	}


	function defaultBBot() {

		return '<p>Зацепка? Hook!</p>' +
			   '<p>Fresh meat!</p>'

	}

}
