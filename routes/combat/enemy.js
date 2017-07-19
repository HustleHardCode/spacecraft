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

const router = express.Router();

module.exports = router;

/**
 * ------------------------------------------------
 * GET
 * ------------------------------------------------
 */

router.get('/combat/enemy', checkAuthentication, (req, res) => {

	let idUser = req.user._id;

	CombatCodeModel.find({})
				   .where('idUser')
				   .ne(idUser)
				   .exec(onFind);

	function onFind(err, documents) {

		if (!err) {

			if (lodash.isEmpty(documents)) {

				res.sendStatus(HttpStatus.NO_CONTENT);

				return;

			}

			const code = getCodeFromRandomDocument(documents);

			if (code) {

				res.status(HttpStatus.OK).send(code);

			} else {

				// Обрабатываем случай, когда поле кода оказалось пустым (по каким-либо причинам).
				res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);

			}

			return;

		}

		return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);

		/**
		 * Логика взятия программного кода у случайного документа среди всех имеющихся на входе функции.
		 *
		 * @param {Array} documents массив документов среди которых будет выбран случайных документ
		 * у которого и будет взят программный код.
         * @returns {String} программный код документа, который был выбран случайным образом.
         */
		function getCodeFromRandomDocument(documents) {

			// Логика взятия случайной записи.
			const randomIndex = lodash.random(0, documents.length - 1);
			const document = documents[randomIndex];

			return document.code;

		}

	}

});
