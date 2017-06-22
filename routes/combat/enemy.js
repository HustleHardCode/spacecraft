/**
 * @since 18.06.17
 * @author iretd
 */

"use strict";

const checkAuthentication = require('./../../middlewares/check-authentication');
const CombatCodeModel = require('./../../models/combat.code');

const lodash = require('lodash');
const HttpStatus = require('http-status-codes');
const express = require('express');
const util = require('util');
const coWrap = require('co-express');

const router = express.Router();

module.exports = router;

/**
 * ------------------------------------------------
 * GET
 * ------------------------------------------------
 */

router.get('/combat/enemy', checkAuthentication, coWrap(function* (req, res) {

	// TODO При желании, можно определять сообщение.
	req.checkQuery('idCombat').notEmpty().isInt();

	const result = yield req.getValidationResult();

	if (!result.isEmpty()) {

		res.sendStatus(HttpStatus.BAD_REQUEST);

		return;

	}

	let idUser = req.user._id;
	let idCombat = req.query.idCombat;

	CombatCodeModel.find({idCombat})
				   .where('idUser').ne(idUser)
				   .exec(onFind);

	function onFind(err, documents) {

		if (!err) {

			if (lodash.isEmpty(documents)) {

				res.sendStatus(HttpStatus.ACCEPTED);

				return;

			}

			// Логика взятия случайной записи.
			const randomIndex = lodash.random(0, documents.length);
			const document = documents[randomIndex];

			const code = document.code;

			if (code) {

				res.status(HttpStatus.OK).send(code);

			} else {

				// Обрабатываем случай, когда поле кода оказалось пустым (по каким-либо причинам).
				res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);

			}

			return;

		}

		return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);

	}

}));
