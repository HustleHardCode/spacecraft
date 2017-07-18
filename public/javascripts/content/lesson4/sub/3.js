'use strict';

module.exports = BadBBot();


/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function BadBBot() {

	return {
		title:             'Плохой робот',
		isRestartDisabled: true,
		question:          {
			content:                  '<p>Ухх…</p>' +
									  '<p>Кажется опасность позади, ' +
									  'но назойливый <strong>BBot</strong> не дает спокойно отдохнуть. ' +
									  '<p>Его нужно немного проучить.</p>' +
									  '<p>Например, заставить сказать что-нибудь против его воли.</p>',
			answerOptions:            [
				'\'BBot плохой робот!\'',
				'BBot плохой робот!',
				'<strong>BBotDebug(</strong>BBot плохой робот!<strong>)</strong>',
				'<strong>BBotDebug(</strong>\'BBot плохой робот!\'<strong>)</strong>'
			],
			correctAnswerNumbers:     [3],
			correctAnswerDescription: '<p>Транслирую:</p>' +
									  '<p class="bbot-output">BBot плохой робот!</p>'
		},
		character:         [{
			audio: 'audio/lesson5/3',
			css:   'wonk-img'
		}]
	};

}
