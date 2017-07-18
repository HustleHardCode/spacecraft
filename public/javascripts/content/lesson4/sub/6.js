'use strict';

module.exports = Fuel();


/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Fuel() {

	return {
		title:             'Топливо',
		isRestartDisabled: true,
		question:          {
			content:                  '<p>До свободы остался всего один шаг, но похоже корабль, ' +
									  'на который вы пробрались, не заправлен.</p>' +
									  '<p><strong>BBot</strong> любезно готов предоставить вам пластиковую трубку и канистру, ' +
									  'но пожалуй силу ваших легких мы проверим в другой раз.</p> ' +
									  '<p>Воспользоваться терминалом заправочной станции будет куда проще.</p>' +
									  '<p>Переместите топливо с заправочной станции в контейнер корабля.</p>',
			answerOptions:            [
				'container = <strong>null</strong>',
				'\'Топливо\' = 55',
				'\'Топливо\' = container',
				'container = \'Топливо\''
			],
			correctAnswerNumbers:     [3],
			correctAnswerDescription: '<p>Да, я милаха!</p>'
		},
		character:         [{
			audio: 'audio/lesson5/6',
			css:   'wonk-img'
		}]
	};

}
