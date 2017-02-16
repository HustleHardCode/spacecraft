/**
 * Created by vladthelittleone on 29.02.16.
 */
var express = require('express');
var HttpStatus = require('http-status-codes');
var router = express.Router();

const checkAuthentication = require('./../middlewares/check-authentication');

module.exports = router;

/**
 * Возврат информации о текущем пользователе.
 */
router.get('/info', checkAuthentication, function (req, res, next) {

	res.send({
				 email: req.user.email
			 })

});

router.get('/session', function (req, res, next) {

	var status = req.isAuthenticated() ? HttpStatus.NO_CONTENT :
				 HttpStatus.UNAUTHORIZED;

	return res.sendStatus(status);

});
