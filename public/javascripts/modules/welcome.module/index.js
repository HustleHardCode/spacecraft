'use strict';

/**
 * Модуль главной страницы.
 *
 * Created by vladthelittleone on 30.11.15.
 */
var angular = require('angular');

require('angular-chart.js');
require('angular-lazy-loader');

var app = angular.module('spacecraft.welcome.module', ['chart.js', 'angular-lazy-loader']);

app.config(require('./welcome.config'));
app.controller('WelcomeController', require('./welcome.controller'));
