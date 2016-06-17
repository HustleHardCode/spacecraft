/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var Statistic = require('models/statistic').Statistic;
var HttpError = require('error').HttpError;
var router = express.Router();

// Запись статы о прохождении уроков юзером
router.post('/lessons', function(req, res, next)
{
	var id = req.session.user;

	if (id)
	{
		Statistic.updateLessonStatistics(id, req, function(err)
		{
			if(err)
			{
				next(new HttpError(500, "Ошибка с сохранением урока"));
			}
		});
	}

	res.send([]);
});

// Получение статистики юзера о прохождении уроков
router.get('/lessons', function(req, res, next)
{
	Statistic.getUserStatistics(req.session.user, function(err, result)
	{
		if (err)
		{
			return next(new HttpError(500, "Ошибка с поиском лучших пользователей"));
		}

		if (result)
		{
			res.json(result.lessons);
		}
		else
		{
			res.send([]);
		}
	});
});

router.post('/lessons/stars', function(req, res, next)
{
	Statistic.updateLessonStarStatistics(req, function(err)
	{
		if (err)
		{
			return next(new HttpError(500, "Ошибка сохранения оценки урока"));
		}

		res.sendStatus(200);
	});
});

module.exports = router;
