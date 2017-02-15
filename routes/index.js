/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */
const login = require('./login');
const user = require('./api/user');
const logout = require('./logout');
const reg = require('./registration');
const statistic = require('./statistic');
const metrics = require('./metrics');
const checkAuthentication = require('./../middlewares/check-authentication');

module.exports = function (app)
{
	// Мидлвер
	app.use('/api', login);
	app.use('/reg', reg);
	app.use('/logout', logout);

	// Проверка на аутентификацию, прежде чем допустить
	// к нижележащим маршрутам.
	app.use(checkAuthentication);

	app.use('/user', user);
	app.use('/statistic', statistic);
	app.use('/metrics', metrics);
};

