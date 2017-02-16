'use strict';

// Экспорт
module.exports = Content();

/**
 * Created by vaimer on 15.02.2017.
 */

function Content() {

	var points = {
		// Изначальное число очков у игрока на уроке.
		totalPoints: 600,
		// Штрафные очки за действия на уроке.
		exception: 30,
		incorrectInput: 20
	};

	return {
		text:  'Перевозка грузов',
		label: 'Основы JavaScript',
		quote: 'То, что для одного человека константа, для другого - переменная. (Алан.Дж.Перлис)',
		sub:   require('./sub'),
		points: points,
		maxAttemptLessonCountForBonus: 4
	};

}