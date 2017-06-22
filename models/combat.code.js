/**
 * @since 18.06.17
 * @author iretd
 */

"use strict";

var mongoose = require('utils/mongoose');
const esprima = require('esprima');

var Schema = mongoose.Schema;

var schema = new Schema({
	idUser:   {
		index:    true,
		type:     Schema.Types.ObjectId,
		ref:      'User',
		required: [true, 'Не указан пользователь']
	},
	idCombat: {
		type:     Schema.Types.Number,
		sparse:   true,
		required: [true, 'Не указан номер сражения']
	},
	code:     {
		index:    true,
		type:     Schema.Types.String,
		validate: {
			validator: isJSCodeValid,
			message:   'Код сражения должен быть синтаксически корректным JS кодом!'
		},
		required: [true, 'Не указан программный код']
	},
	status:   {
		index:    true,
		sparse:   true,
		type:     Schema.Types.Number,
		required: [true, 'Не указан статуст программного кода']
	}
});

module.exports = mongoose.model('combat.code', schema);

function isJSCodeValid(code) {

	const syntax = esprima.parse(code, {tolerant: true, loc: true});
	const errors = syntax.errors;

	return errors.length === 0;

}
