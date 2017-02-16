var crypto = require('crypto');
var async = require('async');
var mongoose = require('utils/mongoose');
var HttpError = require('error').HttpError;

var Schema = mongoose.Schema;

var schema = new Schema({
	email:              {
		type:     String,
		unique:   true,
		default:  null
	},
	username:           {
		type: String
	},
	hashedPassword:     {
		type:     String
	},
	vkId:		        {
		type:     String,
		unique:   true,
		default:  null
	},
	salt:               {
		type:     String
	},
	isSubscribeOnEmail: {
		type:     Boolean
	},
	created:            {
		type:    Date,
		default: Date.now
	}
});

schema.virtual('password')
	.set(function (password) {

		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);

	})
	.get(function () {

		return this._plainPassword;

	});

schema.methods.encryptPassword = encryptPassword;
schema.methods.checkPassword = checkPassword;
schema.statics.authorize = authorize;
schema.statics.registration = registration;
schema.statics.getUserCreationDate = getUserCreationDate;
schema.statics.findOrCreateVKUser = findOrCreateVKUser;

exports.User = mongoose.model('User', schema);

function encryptPassword(password) {

	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');

}

function checkPassword(password) {

	return this.encryptPassword(password) === this.hashedPassword;

}

/**
 * 1. Получить юзера с таким email из базы.
 * 2. Такой посетитель найден?
 *  Да - сверить пароль вывозвом checkPassword.
 *  Нет - создать нового пользователя
 * 3. Авторизация успешна?
 *  Да - сохранить _id посетителя в сессии: session.user = user._id и ответить 200
 *  Нет - вывести ошибку (403 или другую)
 * @param email
 * @param password
 * @param callback
 */
function authorize(email, password, callback) {

	let User = this;

	async.waterfall([

		function (callback) {

			User.findOne({ email: email }, callback);

		},
		function (user, callback) {

			if (user) {

				// если для пользователя задан vkId и не задан пароль
				// то пользователь не может авторизироваться через логин/пароль
				if (user.vkId && !user.hashedPassword) {

					callback(new HttpError(403, "Воспользуйтесь авторизацией через VK."));

				}
				else if (user.checkPassword(password)) {

					callback(null, user);

				} else {

					callback(new HttpError(403, 'Пароль неверен'));

				}

			} else {

				callback(new HttpError(403, 'Пользователь не найден'));

			}
		}

	], callback);

}

function registration(email, password, isSubscribeOnEmail, callback) {

	let User = this;

	async.waterfall([

		function (callback) {

			User.findOne({email: email}, callback);

		},
		function (user, callback) {

			if (!user) {

				let newbie = new User({

					email: email,
					password: password,
					isSubscribeOnEmail: isSubscribeOnEmail

				});

				newbie.save(function (err) {

					callback(err, newbie);

				});
			}
			else {

				callback(new HttpError(403, 'Пользователь уже существует'));

			}
		}

	], callback);

}

/**
 * Функция ищет пользователя по его vk id
 * если пользователь не найдет функция создает нового пользователя в базе
 */
function findOrCreateVKUser (vkId, email, callback) {

	let User = this;

	async.waterfall([

			(callback) => {

				User.findOne({vkId: vkId}, callback);

			},
			(user, callback) => {

				if (!user) {

					let newbie = new User ({

						email: email,
						vkId: vkId

					});

					newbie.save((err) => {

						callback(err, newbie, true);

					});
				}
				else {

					callback(null, user, false);

				}
			}

	], callback);

}

/**
 * Возвращает дату создания акка пользователя.
 */
function getUserCreationDate(userID, callback) {

	let User = this;

	async.waterfall([

		function (callback) {

			User.findById(userID, callback);

		},
		function (user, callback) {

			callback(user ? user.created : null);

		}

	], callback)

}
