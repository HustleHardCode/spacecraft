'use strict';

var angular = require('angular');

var app = angular.module('spacecraft.lazy.module', []);

app.provider('lazyImgConfig', require('./lazy.img.config'));
app.factory('lazyImgHelpers', require( './lazy.img.helpers'));
app.factory('lazyImgMagic', require('./lazy.module'));
app.directive('lazyImgContainer', require('./lazy.img.container'));
app.directive('lazyImgDirective', require('./lazy.img.directive'));

