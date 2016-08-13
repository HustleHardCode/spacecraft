'use strict';

// Экспорт
module.exports = Content();

/**
 * Контент первого урока.
 *
 * Created by vladthelittleone on 12.06.16.
 */
function Content() {

	var points = {
		// Изначальное число очков у игрока на уроке.
		totalPoints: 1000,
		// Штрафные очки за действия на уроке.
		exception: 100,
		incorrectInput: 40,
		missionStopTransportFail: 100
	};

	return {
		text: 'Первое занятие',
		label: 'Основы JavaScript',
		quote: 'Преодоление трудного начинается с легкого',
		rules: require('./autocomplete.json'),
		isGameLesson: true,
		sub:   require('./sub'),
		points: points,
		maxAttemptLessonCountForBonus: 3
	};

}
