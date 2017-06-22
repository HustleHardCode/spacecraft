'use strict';

Connection.$inject = ['$http'];

module.exports = Connection;

/**
 * Ссылки на REST API
 */
var apiUrls = require('./../utils/json/urls/api.json');
var resourcesUrls = require('./../utils/json/urls/resources.json');

/**
 * Сервис взаимоедйствия с бекендом.
 *
 * Created by Ivan on 07.05.2016.
 */
function Connection($http) {

	var that = {};

	that.getCodeFromJs = getCodeFromJs;

	that.getLessonCodeFromJs = getLessonCodeFromJs;
	that.getCombatDefaultUserCode = getCombatDefaultUserCode;

	that.getCombatEnemy = getCombatEnemy;

	that.getCombatUserCode = getCombatUserCode;
	that.saveCombatUserCode = saveCombatUserCode;

	that.saveLessonsStatistics = saveLessonsStatistics;
	that.getLessonsStatistics = getLessonsStatistics;

	that.rateLesson = rateLesson;

	that.getLeaderBoard = getLeaderBoard;

	that.login = login;
	that.logout = logout;
	that.register = register;

	that.getUserInfo = getUserInfo;

	that.getUserProgress = getUserProgress;
	that.updateUserProgress = updateUserProgress;

	that.checkSession = checkSession;

	return that;

	function getCombatUserCode(idCombat, success, error) {

		$http({
				  url:    apiUrls.combatUserCode,
				  method: 'GET',
				  params:   { idCombat }
			  }).then(claimHttpDataOnly(success), error);

	}
	
	/**
	 * Метод реализации отправки POST запроса на сохранение программного кода сражения пользователя.
	 *
	 * @param args параметры, которые будут включены в тело запроса.
	 * @param success коллбэк вызываемый в случае успешного сохранения.
	 * @param error коллбэк обработки ошибочно ситуации.
	 */
	function saveCombatUserCode(args, success, error) {

		$http({
				  url:    apiUrls.combatUserCode,
				  method: 'POST',
				  data:   args
			  }).then(success, error);

	}

	function getCombatEnemy(idCombat, success, error) {

		$http({
				  url:    apiUrls.combatEnemy,
				  method: 'GET',
				  params:   { idCombat }
			  }).then(claimHttpDataOnly(success), error);

	}

	function claimHttpDataOnly(callback) {

		return function (response) {

			return callback && callback(response.data);

		}

	}

	function checkSession(ignoreAuthModule, success, error) {

		$http({
				  url:    apiUrls.userSession,
				  method: 'GET',
				  ignoreAuthModule: ignoreAuthModule
			  }).then(success, error);

	}

	function getUserInfo(success, error) {

		$http({
				  url:    apiUrls.userInfo,
				  method: 'GET'
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));

	}

	function getLeaderBoard(success, error) {

		$http({
				  url:    apiUrls.leaderBoard,
				  method: 'GET'
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));

	}

	/**
	 * Сохранение статистики урока.
	 */
	function saveLessonsStatistics(args, success, error) {

		$http({
				  url:    apiUrls.lessons,
				  method: 'POST',
				  data:   args
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));

	}

	/**
	 * Сохранение оценки урока.
	 */
	function rateLesson(lessonId, stars, success, error) {

		$http({
				  url:    apiUrls.lessonStar,
				  method: 'POST',
				  data:   {
					  lessonId: lessonId,
					  stars:    stars
				  }
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));

	}

	/**
	 * Получить код из .js файла.
	 */
	function getCodeFromJs(source, success, error) {

		$http({
				  method: 'GET',
				  url:    source
			  }).then(claimHttpDataOnly(success), error);

	}

	/**
	 * Получить код для урока из .js файла.
	 */
	function getLessonCodeFromJs(lessonId, subLessonId, callback) {

		var source = resourcesUrls.lessonCode + lessonId + '/' + subLessonId + '.code';

		getCodeFromJs(source, callback)

	}

	/**
	 * Получить код для сражений из .js файла.
	 */
	function getCombatDefaultUserCode(code, success, error) {

		var source = resourcesUrls.combatUserCode + '/' + code + '.code';

		getCodeFromJs(source, success, error)

	}

	/**
	 * Статистика уроков.
	 */
	function getLessonsStatistics(success, error) {

		$http.get(apiUrls.lessons).then(claimHttpDataOnly(success),
										claimHttpDataOnly(error));

	}

	/**
	 * Вход в систему.
	 */
	function login(data, success, error) {

		$http({
				  method: 'POST',
				  data:   data,
				  ignoreAuthModule: true,
				  url:    apiUrls.login
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));
	}

	/**
	 * Выходи из системы.
	 */
	function logout(success, error) {

		$http({
				  method: 'POST',
				  url:    apiUrls.logout
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));

	}

	/**
	 * Регистрация в сервисе.
	 */
	function register(args) {

		$http({
				  method: 'POST',
				  data:   {
					  email:              args.email,
					  password:           args.password,
					  subscriptionToMailingFlag: args.subscriptionToMailingFlag
				  },
				  ignoreAuthModule: true,
				  url:    apiUrls.register
			  }).then(claimHttpDataOnly(args.success),
					  claimHttpDataOnly(args.error));

	}

	function getUserProgress(success, error) {

		$http.get(apiUrls.userProgress).then(claimHttpDataOnly(success),
											 claimHttpDataOnly(error));

	}

	function updateUserProgress(score, callback) {

		$http({
				  url:    apiUrls.userProgress,
				  method: 'POST',
				  data:   {
					  score: score
				  }
			  }).then(callback);
	}

}
