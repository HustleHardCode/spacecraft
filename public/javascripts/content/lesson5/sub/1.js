'use strict';

module.exports = Hook();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function Hook() {

	return {
		isRestartDisabled: true,
		defaultBBot:       defaultBBot,
		title:             'Зацепка',
		content:           content,
		character:         [{
			audio: 'audio/lesson6/1-1',
			css:   'astromen-img'
		}],
		instructions:      '<ul>' +
						   '<li>Нажмите «Далее» для продолжения.</li>' +
						   '</ul>',
	};

	function content() {

		return '<p>Исследователи Академии нашли интересную зацепку: датчик похоже был оставлен ' +
			'кораблем класса <strong>EBON HAWK</strong>.</p> ' +
			'<p>Ближайший зарегистрированный нами корабль такого типа находиться в одном парсеке от ' +
			'базы академии рядом с планетой <strong>Явавин</strong>. Возможно ' +
			'владелец данного корабля является хакером, взломавшим наши системы. Хм...</p>' +
			'<p>Сильное заявление, проверять я его конечно не буду! Вместо меня полетите вы, и найдете ' +
			'информацию о хозяине корабля. Но перед этим вы должны подготовиться.</p>';

	}


	function defaultBBot() {

		return '<p>Зацепка? Hook!</p>' +
			'<p>FRESH MEAT!</p>'

	}

}
