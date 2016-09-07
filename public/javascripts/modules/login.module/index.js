'use strict';

/**
 * Модуль авторизации пользователя.
 *
 * Created by vladthelittleone on 30.11.15.
 */
var angular = require('angular');

var app = angular.module('spacecraft.login.module', ['angularLazyImg']);

app.config(require('./login.config'));
app.controller('LoginController', require('./login.controller'));
