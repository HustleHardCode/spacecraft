'use strict';

module.exports = Content();

/**
 * @author Aleksandrov Oleg
 * @since 04.06.17
 */

function Content() {

	const points = {
		// Изначальное число очков у игрока на уроке.
		totalPoints:    400,
		// Штрафные очки за действия на уроке.
		exception:      30,
		incorrectInput: 20
	};

	return {
		text:                          'Повтор за повтором',
		label:                         'Основы JavaScript',
		quote:                         'Выполняем бесконечные циклы за 5 секунд',
		defs:                          require('./autocomplete.json'),
		sub:                           require('./sub'),
		isGameLesson:                  true,
		points:                        points,
		maxAttemptLessonCountForBonus: 4
	};

}
