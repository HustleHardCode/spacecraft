'use strict';

module.exports = Testing();

/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Testing() {

	return {
		title:             'Первый вопрос',
		isRestartDisabled: true,
		question:          {
			content:                  '<p>Здравствуйте, кадет!</p>' +
									  '<p>В этот раз не будет лекций и не будет практики. ' +
									  'Пришло время проверить, как вы усвоили пройденный материал.</p> ' +
									  '<p>Для этого нужно ответить на пару вопросов. ' +
									  'Правильным может быть как один так и несколько вариантов ответов.</p>' +
									  '<p>Выбирайте с умом.</p>' +
									  '<p>Вам все понятно?</p>',
			answerOptions:            ['Да'],
			correctAnswerNumbers:     [0],
			correctAnswerDescription: '<p>Поразительно, что Вы смогли ответитb.</p>' +
									  '<p>Кстати, шансы пройти тест - 3720 к 1.</p>'
		},
		character:         [{
			audio: 'audio/lesson5/1',
			css:   'wonk-img'
		}]
	};

}
