/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var logger = require('../utils/log')(module);

var Statistic = require('models/statistic').Statistic;
var HttpError = require('error').HttpError;
var lodash = require('lodash');

const checkAuthentication = require('./../middlewares/check-authentication');

var router = express.Router();

module.exports = router;

/**
 * Запись статы о прохождении уроков юзером.
 */
router.post('/lessons', checkAuthentication, function (req, res, next) {

	let idUser = req.user._id;
	let dataForUpdate = req.body;

	Statistic.updateLessonStatistics(idUser, dataForUpdate, function (err) {

		if (err) {

			logger.warn(err);

			next(new HttpError(400, "Ошибка с сохранением урока"));

		}

	});

	res.send([]);

});

/**
 * Получение статистики юзера о прохождении уроков.
 */
router.get('/lessons', checkAuthentication, function (req, res, next) {

	let idUser = req.user._id;

	Statistic.getUserStatistics(idUser, function (err, result) {

		if (err) {

			return next(new HttpError(400, "Ошибка с получением статистики пользователя."));

		}

		if (result) {

			// Отправляем массив уроков и финальное число очков по всем урокам
			// отделными полями.
			res.json({
				lessons:         result.lessons,
				totalFinalScore: result.totalFinalScore
			});

		} else {

			res.send([]);

		}

	});

});

router.post('/lessons/stars', checkAuthentication, function (req, res, next) {

	let idUser = req.user._id;

	let dataForUpdate = req.body;

	Statistic.updateLessonStarStatistics(idUser, dataForUpdate, function (err) {

		if (err) {

			return next(new HttpError(400, "Ошибка сохранения оценки урока"));

		}

		res.sendStatus(200);

	});

});

router.get('/lessons/leaderboard', checkAuthentication, function (req, res, next) {

	let idUser = req.user._id;

	Statistic.getLeaderboard(idUser, function (error, leaderBoard) {

		if (error) {

			return next(error);

		}

		res.send(leaderBoard);

	});

});

router.post('/user/progress', checkAuthentication, (req, res, next) => {

	let idUser = req.user._id;
	let scoreFromRequest = req.body.score;

	// Если очки действительно пришли
	if(scoreFromRequest) {

		// Кладем обновленный прогресс пользователя
		Statistic.updateUserProgress(idUser, scoreFromRequest, (error, result) => {

			if (error) {

				return next(new HttpError(400, "Ошибка сохранения очков пользователя"));

			}

			// Отправляем в ответ обновленный массив очков
			res.send(result.userProgress);

		});
	}

});

router.get('/user/progress', checkAuthentication, (req, res, next) => {

	let idUser = req.user._id;

	Statistic.getUserStatistics(idUser,(error, result) => {

		if (error) {

			return next(error)
		}

		let userProgress = [];

		// Если что-то есть в базе
		if (result && result.userProgress) {

			userProgress = result.userProgress;

		}

		res.send(userProgress);

	})
});
