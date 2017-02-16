'use strict';

var User = require ('../../models/user').User;
var LocalStrategy = require ('passport-local').Strategy;
var valid = require ('validator');
var strategyHelp = require('./strategy.help');


var validation = require('../validation');

var local = {};

module.exports = local;

/**
 * имена полей в которых приходят мыло и пароль
 */
var localStrategyReqParam = {

	usernameField:     'email',
	passwordField:     'password',
	passReqToCallback: true

};

/**
 * стратегия для локальной авторизации
 */
local.login = new LocalStrategy(localStrategyReqParam,
	(req, email, password, next) => {

		let normalizeEmail = valid.normalizeEmail(email);

		User.authorize(normalizeEmail, password, (err, user) => {

			next (err, user);

		});

	});

/**
 * стратегия для регистрации пользователя
 */
local.registration = new LocalStrategy(localStrategyReqParam,
	(req, email, password, next) => {

		let normalizeEmail = valid.normalizeEmail(email);
		let isSubscribeOnEmail = req.body.isSubscribeOnEmail;

		User.registration(normalizeEmail, password, isSubscribeOnEmail, (err, user) => {

			if (err) {

				return next (err, email);

			}

			strategyHelp.updateTotalFinalScore(user);

			next(null, user);

		});

	});
