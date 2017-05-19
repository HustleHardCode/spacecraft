'use strict';

const express = require('express');

const app = express();

// В коде удобней различать среды по ИМЕНИ.
const developmentFlag = app.get('env') !== 'production';
const productionFlag = app.get('env') === 'production';

const compression = require('compression');

const HttpStatus = require('http-status-codes');

app.use(compression());

const passport = require('passport');
const path = require('path');
const favicon = require('serve-favicon');
const httpLogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const csurf = require('csurf');

// Наши модули
const config = require('config');
const mongoose = require('./utils/mongoose');
const logger = require('./utils/log')(module);

require('./utils/passport')();

const localStrategy = require('./utils/passport/local');
const vkStrategy = require('./utils/passport/vk');

app.use(require('./middlewares/send-http-error'));

// view engine setup (Т.к. у нас уже написан html, лучше пока не юзать движки)
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// Статику подключаем только в development среде!
// В production за выдачу статики отвечает nginx
if (developmentFlag) {

	app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(express.static(path.join(__dirname, 'public')));

}

app.use(httpLogger('dev'));
app.use(bodyParser.json()); // Парсер json в потоках
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Сторедж для сессии.
const MongoStore = require('connect-mongo')(session);

app.use(session({
					secret:            config.get('session:secret'), // ABCDE242342342314123421.SHA256
					key:               config.get('session:key'),
					resave:            config.get('session:resave'),
					saveUninitialized: config.get('session:saveUninitialized'),
					cookie:            config.get('session:cookie'),
					rolling:           config.get('session:rolling'),
					store:             new MongoStore({
						mongooseConnection: mongoose.connection,
						stringify: false
					})
				}));

// init passportJS
app.use(passport.initialize());
app.use(passport.session());

// CSRF проверку делаем ТОЛЬКО в production.
// В development не имеет смысла :)
if (productionFlag) {

	app.use(csurf());
	app.use(function (req, res, next) {

		res.cookie('XSRF-TOKEN', req.csrfToken());
		return next();

	});

}

passport.use('local-login', localStrategy.login);
passport.use('vk-login', vkStrategy.login);

// инициализируем api;
require('./routes')(app);

// Выдаем стартовую страницу ангуляра,на случай неразрешения роута (для html5 mode).
app.use('/*', function (req, res) {

	res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

const HttpError = require('error').HttpError;

app.use(function (err, req, res, next) {

	// Если ошибка при валидации CSRF
	if (err.code === 'EBADCSRFTOKEN') {

		res.status(HttpStatus.FORBIDDEN);

		return res.send('You cannot do that from outside of our client side ;)')

	}


	// На случай, если из какого-либо middleware выпала ошибка, отличная от числа или HttpError.
	// Это говорит о том, что в err скрыт объект, который создала какая-либо сторонняя библиотека (к примеру, mongoose).
	// Нет необходимости раскрывать ее описание пользователю. Достаточно будет скрыть ее за 500 кодом.
	if (!err instanceof HttpError && !typeof err == 'number') {

		err = HttpStatus.INTERNAL_SERVER_ERROR;

	}

	// Проверка на число. У нас устоялся подход, что для удобства, в некоторых местах кода,
	// в качестве ошибки мы просто указываем Http код.
	if (typeof err == 'number') {

		err = new HttpError(err);

	}

	if (developmentFlag) {

		logger.error(err);

	}

	// middlewares/sendHttpError
	res.sendHttpError(err);

});

if (developmentFlag) {

	var maxHeap = 0;

	setInterval(function () {

					var heap = process.memoryUsage().heapUsed;

					maxHeap = maxHeap < heap ? heap : maxHeap;

					logger.info('Heap size: ' + heap + ', maximum heap size: ' + maxHeap);

				},
				10000);

}

module.exports = app;
