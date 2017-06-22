/**
 * @since 18.06.17
 * @author iretd
 */

"use strict";

const checkAuthentication = require('./../../../middlewares/check-authentication');
const CombatCodeModel = require('./../../../models/combat.code');

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

router.get('/user/combat/code', checkAuthentication,  coWrap(function* (req, res) {

	// TODO При желании, можно определять сообщение.
	req.checkQuery('idCombat').notEmpty().isInt();

	const result = yield req.getValidationResult();

	if (!result.isEmpty()) {

		res.sendStatus(HttpStatus.BAD_REQUEST);

		return;

	}

	let idUser = req.user._id;
	let idCombat = req.query.idCombat;

	CombatCodeModel.findOne({idCombat})
				   .where('idUser').equals(idUser)
				   .exec(onFind);

	function onFind(err, document) {

		if (!err) {

			if (lodash.isEmpty(document)) {

				res.status(HttpStatus.ACCEPTED).send();

				return;

			}

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

/**
 * ------------------------------------------------
 * POST
 * ------------------------------------------------
 */

router.post('/user/combat/code', checkAuthentication, coWrap(function* (req, res) {

	// TODO При желании, можно определять сообщение.
	req.checkBody('idCombat').notEmpty().isInt();
	req.checkBody('code').notEmpty();
	requ.checkBody('status').notEmpty();

	const result = yield req.getValidationResult();

	if (!result.isEmpty()) {

		res.sendStatus(HttpStatus.BAD_REQUEST);

		return;

	}

	const idUser = req.user._id;
	const idCombat = req.body.idCombat;
	const code = req.body.code;
	const status = req.body.status;

	CombatCodeModel.update({idUser, idCombat},
						   {idUser, idCombat, code, status},
						   {
							   upsert:        true,
							   runValidators: true
						   },
						   onUpdate);

	function onUpdate(err) {

		if (err) {

			if (err.name === "ValidationError") {

				const message = "Неверный фомат данных параметра запроса!";

				return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(message);

			} else {

				return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);

			}

		}

		return res.sendStatus(HttpStatus.ACCEPTED);

	}

}));
