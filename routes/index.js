/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */
const login = require('./login');
const user = require('./user');
const logout = require('./logout');
const reg = require('./registration');
const statistic = require('./statistic');

module.exports = function (app)
{
	// Мидлвер
	app.use('/login', login);
	app.use('/reg', reg);
	app.use('/logout', logout);

	app.use('/user', user);
	app.use('/statistic', statistic);
};

