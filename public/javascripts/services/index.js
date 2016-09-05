'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение сервисов.
 */
var app = require('angular').module('spacecraft');

app.factory('aceService', require('./ace.service'));
app.factory('audioManager', require('./audio.service'));
app.factory('authentication', require('./authentication.service'));
app.factory('connection', require('./connection.service'));
app.factory('settings', require('./settings.service'));
app.factory('loaded', require('./loaded.service'));
