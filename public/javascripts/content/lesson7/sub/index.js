'use strict';

/**
 * Created by vaimer on 09.05.2017.
 */

// Зависимсоти
let drill = require('./1');
let ifOperation = require('./2');
let elseOperation = require('./3');
let complexLogicalExpressionOr = require('./4');
let complexLogicalExpressionAnd = require('./5');

module.exports = [drill,
				  ifOperation,
				  elseOperation,
				  complexLogicalExpressionOr,
				  complexLogicalExpressionAnd];
