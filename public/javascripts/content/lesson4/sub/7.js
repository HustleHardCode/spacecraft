'use strict';

module.exports = HHC();


/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function HHC() {

	return {
		title:             'Нашивка HHC',
		isRestartDisabled: true,
		question:          {
			content:                  '<p>Вам все-таки удалось спастись.</p>' +
									  '<p>И похоже,  по этому поводу в академии решили закатить вечеринку. ' +
									  'Вечеринка в самом разгаре. Прогуливаясь по банкетному залу, почти в самом центре, ' +
									  'Вы замечаете пятерых кадетов. Среди всех присутствующих, они выделяются необычной, ' +
									  'для этих мест, нарукавной нашивкой - <strong>HHC</strong>.</p>' +
									  '<p>Ненароком Вы услышали, как один из них сказал: ' +
									  '<pre><strong>undefined</strong> это тоже самое, что и <strong>null</strong></pre> ' +
									  '<p>Вы не могли не вмешаться. Потому что?</p>',
			answerOptions:            [
				'Все верно! Нужно помочь кадету доказать его правоту.',
				'<strong>null</strong> - «значение не было задано».',
				'<strong>undefined</strong> - «значение не было задано».',
				'<strong>undefined</strong> - «значение неизвестно».',
				'<strong>null</strong> - «значение неизвестно».',
				'Кадеты должны работать и учиться. Хватит прохлаждаться!'
			],
			correctAnswerNumbers:     [2, 4],
			correctAnswerDescription: '<p>Простите его. В конце-концов, он всего лишь кадет!</p>'
		},
		character:         [{
			audio: 'audio/lesson5/7',
			css:   'wonk-img'
		}]
	};

}
