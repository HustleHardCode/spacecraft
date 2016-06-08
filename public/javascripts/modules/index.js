/**
 * Created by vladthelittleone on 08.06.16.
 *
 * Подключение модулей.
 */
require('./game.module');
require('./lesson.module');
require('./lessons.module');
require('./login.module');
require('./quick.module');
require('./result.module');
require('./welcome.module');

require('angular').module('spacecraft.modules', [
	'spacecraft.game.module',
	'spacecraft.lesson.module',
	'spacecraft.lessons.module',
	'spacecraft.login.module',
	'spacecraft.quick.module',
	'spacecraft.result.module',
	'spacecraft.welcome.module'
]);
