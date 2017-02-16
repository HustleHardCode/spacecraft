'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('config');
var User = require ('../../models/user').User;
var strategyHelp = require('./strategy.help');

var validation = require('../validation');

var vk = {};

module.exports = vk;

vk.login = new VKStrategy(config.get('vkStrategySettings'),

	(accessToken, refreshToken, params, profile, next) => {

		User.findOrCreateVKUser(profile.id, params.email, (err, user, isRegistration) => {

			// проверяем прошла ли авторизация успешно
			if (!err) {

				if (isRegistration) {

					strategyHelp.updateTotalFinalScore(user);

				}

			}

			next (err, user);

		});

	}
);
