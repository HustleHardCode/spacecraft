'use strict';

var angular = require('angular');

var app = angular.module('spacecraft.lazy.module', []);

app.provider('lazyImgConfig', require('./lazy.provider'));
app.factory('LazyImgMagic', require('./lazy.module'));
app.factory('lazyImgHelpers', require( './lazy.helpers'));
app.directive('lazyImg', require('./lazy.directive'));

