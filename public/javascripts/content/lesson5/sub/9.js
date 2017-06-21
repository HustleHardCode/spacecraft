'use strict';

var LessonResults = require('../../lesson-results');

module.exports = Pursuit();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function Pursuit() {

	return {
		isRestartDisabled: true,
		title:             'Вперед! В погоню!',
		content:           content,
		instructions:      '<ul>' +
							// Доп: px - это единица измерения расстояния космического флота.
						   '<li>Чтобы увеличить скорость корабля, измените значение переменной <span class="red-label">velocity</span>.</li>' +
						   '<li>Скорость должна изменяться постепенно (не более чем на <b>1 px/сек</b>).</li>' +
						   '<li>Как только вы приблизитесь на дистанцию менее <b>100 px</b> до корабля противника, активируйте <b>ЭМИ</b> с помощью команды <span class="red-label">emp</span>.</li>' +
						   '</ul>',
		character:         [],
		hint:              '<ul>' +
						   '<li>Увеличить скорость корабля можно, используя оператор инкремент <strong class="under-label-gray">++</strong>.</li>' +
						   '<li>Узнать, что расстояние до корабля меньше <b>100 px</b>, можно, используя выражение <span class="red-label"><b>distance</b> < 100</span>.</li>' +
						   '</ul>',
		gamePostUpdate:    gamePostUpdate,
	};

	function content() {

		return '<p>Наш корабль выходит из варп режима. <b>EBON HAWK</b> находится в пределах видимости сканера. Мы глушим все внешние коммуникации противника, ' +
			   'но заложенная автономная программа не позволяет кораблю остановиться.</p>' +
			   '<p>Вам поставлена задача догнать и захватить корабль противника, используя изученные операторы.</p>';

	}

	function gamePostUpdate(api, lesson, text) {

		var lessonResults = LessonResults({
			correct:      '<p>Не так зрелищн0, как BBot рассчитывал, но заTо все получилось.</p>',
			unknownError: '<p>Похоже что у кадета проблемы с наб0ром скорости? Проверьте код и попробуйте ещё раз.</p>',
			text:         '<p>Скорость корабля:</p>' +
						  '<p class="bbot-output">' + text + '</p>'
		});

		if (api && api.isCaught()) {

			return lessonResults.resultCorrect();

		} else {

			return lessonResults.text();

		}

	}
}
