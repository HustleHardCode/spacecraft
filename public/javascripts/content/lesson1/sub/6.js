'use strict';

// Зависимсоти
var BBotText = require('../../bot-text');
var CodeLauncher = require('../../../game/launcher');

module.exports = Alert();

/**
 * Урок - 'Комментарии'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Alert() {

	var missionStatus = {
		IN_PROGRESS: 0,
		SUCCESS: 1,
		FAILED: -1
	};

	var currentMissionStatus = missionStatus.IN_PROGRESS;

	var TIME = 20000;

	var time = 0;
	var delta = 0;

	return {
		title:        'Тревога',
		runOnStart:   true,
		content:      content,
		// Список команд задан в панели инструкций
		instructions: '<ul>' +
					  '<li>У вас мало времени. По расчетам BBot\'а осталось 20 секунд.</li>' +
					  '<li><span class="red-label">transport.moveForward()</span> - полет вперед.</li>' +
					  '<li><span class="red-label">transport.rotateLeft()</span> - поворот влево.</li>' +
					  '<li><span class="red-label">transport.rotateRight()</span> - поворот вправо.</li>' +
					  '<li>Команды внутри комментариев не выполняются!</li>' +
					  '</ul>',
		character:    [{
			audio: 'audio/lesson2/6-1.mp3',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson2/6-2.mp3',
			css:   'astrogirl-img'
		}],

		gamePreUpdate: gamePreUpdate,

		gamePostUpdate: gamePostUpdate

	};

	function gamePreUpdate(index, callback) {

		// Если подурок первый
		if (index > 0) {

			callback && callback();

		}
		else {	// Иначе останавилваем.

			CodeLauncher.stop();

		}

	}

	function gamePostUpdate(transport, currentStatistics) {

		var botText = BBotText({

			failed: '<p>О нет, наш корабль уничтожили!</p>' +
					'<p>Что ж одним больше, другим меньше!</p>',

			correct: '<p>Ура! Корабль спасен!</p>' +
					 '<p>Hasta la vista, baby!</p>',

			text: '<p>Хьюстон, у нас проблема!</p>' +
				  '<p>Осталось мало времени: ' + Math.floor(TIME / 1000 - delta / 1000) + '!</p>'

		});

		// Если транспорт уничтожен,
		// результат отрицательный.
		if (!transport.isAlive()) {

			// Дабы избавиться от многократного отнимания очков.
			if (currentMissionStatus === missionStatus.IN_PROGRESS) {

				currentMissionStatus = missionStatus.FAILED;

				var lessonPoints = currentStatistics.getLessonPoints();

				currentStatistics.subCurrentScore(lessonPoints.missionStopTransportFail);
			}

			return botText.resultFaield();

		}

		if (!time) {

			time = Date.now();

		} else {

			// Разница между текущим и записаным
			delta = Date.now() - time;

			// Если дельта больше TIME секунд
			if (delta > TIME) {

				// currentMissionStatus = missionStatus.SUCCESS;

				// Победа!
				return botText.resultCorrect();

			}

		}

		return botText.text();

	}

	function content() {

		return '<p>Ну что ж первый урок подошел...</p>'
			+ '<p>Кадет, кто-то захватил управление над наши кораблем! Он летит к минному полю!</p>'
			+ '<p>Используйте все знания, которые вы приобрели, чтобы исправить ситуацию.</p>'

	}

}
