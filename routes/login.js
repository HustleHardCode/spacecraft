/**
 * @since 29.02.16
 * @author Skurishin Vladislav
 */
var express = require('express');
var valid = require('validator');
var router = express.Router();

var User = require('models/user').User;
var Cohorts = require('models/cohorts').Cohorts;
var AuthError = require('error').AuthError;
var HttpError = require('error').HttpError;

function isEmail(email) {

	if (!email) {

		return false;
	}

	return valid.isEmail(email);
	
}

function isPassword(password) {

	if (!password) {

		return false;
	}

	return valid.isLength(valid.trim(password), {min: 8});

}

router.post('/', function (req, res, next) {

	var email = req.body.email;
	var password = req.body.password;

	if (!isEmail(email)) {

		return next(new HttpError(400, 'Некорректный email'));

	}

	if (!isPassword(password)) {

		return next(new HttpError(400, 'Пароль неверен'));

	}

	var normalizedEmail = valid.normalizeEmail(email);

	User.authorize(normalizedEmail, password, function (err, user) {

		if (err) {

			if (err instanceof AuthError) {

				return next(new HttpError(403, err.message));

			}
			else {

				return next(err);

			}

		}

		req.session.user = user._id;

		Cohorts.updateCohort(user._id, function(data, cohortID) {

			if (data) {

				data.cohorts[cohortID].visits++;

			}
		});

		res.send({

			email: normalizedEmail

		});
	});

});

router.get('/check', function (req, res, next) {

	if (!req.session.user) {

		return next(new HttpError(401, "Вы не авторизованы"));

	}

	res.send({

		email: req.user.email

	});
});

module.exports = router;
