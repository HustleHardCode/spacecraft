'use strict';

const express = require('express');
const passport = require('passport');
const path = require('path');
const favicon = require('serve-favicon');
const httpLogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// Наши модули
const config = require('config');
const mongoose = require('./utils/mongoose');
const logger = require('./utils/log')(module);
require('./utils/passport')();
var localStrategy = require('./utils/passport/local');
var vkStrategy = require('./utils/passport/vk');

var maxHeap = 0;

const app = express();

var resourcesFolderName = app.get('env') === 'development' ? 'public' : 'build';

app.use(require('./middlewares/send-http-error'));

// view engine setup (Т.к. у нас уже написан html, лучше пока не юзать движки)
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(httpLogger('dev'));
app.use(bodyParser.json()); // Парсер json в потоках
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Сторедж для сессии.
const MongoStore = require('connect-mongo/es5')(session);

app.use(session({
					secret:            config.get('session:secret'), // ABCDE242342342314123421.SHA256
					key:               config.get('session:key'),
					resave:            config.get('session:resave'),
					saveUninitialized: config.get('session:saveUninitialized'),
					cookie:            config.get('session:cookie'),
					rolling:           config.get('session:rolling'),
					store:             new MongoStore({mongooseConnection: mongoose.connection})
				}));

app.use(express.static(path.join(__dirname, resourcesFolderName)));

// init passportJS
app.use(passport.initialize());
app.use(passport.session());

passport.use('local-login', localStrategy.login);
passport.use('local-registration', localStrategy.registration);
passport.use('vk-login', vkStrategy.login);

require('./routes')(app);

// Выдаем стартовую страницу ангуляра,на случай неразрешения роута (для html5 mode).
app.use('/*', function (req, res) {

	res.sendFile(path.join(__dirname, resourcesFolderName, 'index.html'));

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {

	var err = new Error('На просторах вселенной страница не найдена!');
	err.status = 404;
	next(err);

});

const HttpError = require('error').HttpError;

app.use(function (err, req, res, next) {

	// Проверка на error/HttpError
	if (typeof err == 'number') {

		err = new HttpError(err);

	}

	if (app.get('env') === 'development') {

		logger.error(err);

	}

	// middlewares/sendHttpError
	res.sendHttpError(err);

});

if (app.get('env') === 'development') {

	setInterval(function () {

					var heap = process.memoryUsage().heapUsed;

					maxHeap = maxHeap < heap ? heap : maxHeap;

					logger.info('Heap size: ' + heap + ', maximum heap size: ' + maxHeap);

				},
				10000);

}

module.exports = app;
