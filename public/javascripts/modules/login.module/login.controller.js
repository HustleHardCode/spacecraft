'use strict';

var ENTER = 13;

LoginController.$inject = ['$scope', '$state', 'authentication'];

module.exports = LoginController;

/**
 * Контроллер авторизации пользователя.
 *
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function LoginController($scope, $state, authentication) {

	// Переменная отвечающая за отображение нужной формы
	$scope.isEnterForm = true;

	// По дефолту считаем, что человек согласен на рассылку
	$scope.isSubscribeOnEmail = true;

	// Если пользователь авторизован,
	// отправляем на welcome состояние.
	authentication.isLoggedIn({
		success: toWelcome
	});

	$scope.changeForm = changeForm;
	$scope.changeSubscribe = changeSubscribe;
	$scope.loginByKey = loginByKey;
	$scope.register = register;
	$scope.login = function () { login(toWelcome); };

	$scope.bLazy = new Blazy({
		success: function (element) {
			setTimeout(function(){
				element.className = element.className.replace('loaded-background','');
			},200)
		}
	});

	// ==================================================

	function changeSubscribe() {

		$scope.isSubscribeOnEmail = !$scope.isSubscribeOnEmail;

	}

	function changeForm() {

		$scope.isEnterForm = !$scope.isEnterForm;

	}
	// Переход на состояние welcome
	function toWelcome() {

		$state.go('welcome');

	}

	// Обработка нажатия клавиши 'Enter'
	function loginByKey(code) {

		if (code === ENTER) {

			$scope.login();

		}

	}

	// Переход на состояние первого урока
	function toLesson() {

		login(function () {

			$state.go('lesson', {id: 0})

		});

	}

	/**
	 * Регистрация в сервисе
	 */
	function register () {

		var email = $scope.email;

		var pass = $scope.password;

		var subscribe = $scope.isSubscribeOnEmail;

		authentication.register({
			email:    email,
			password: pass,
			isSubscribeOnEmail: subscribe,
			success:  toLesson,
			error:    error
		});

	}


	// Состояние ошибки
	function error(res) {

		$scope.error = res.data;

	}

	/**
	 * Вход в систему.
	 *
	 * @param callback выполняется в случае успешного запроса
     */
	function login(callback) {

		var email = $scope.email;

		var pswrd = $scope.password;

		authentication.login({
			email:    email,
			password: pswrd,
			success:  callback,
			error:    error
		});

	}

}
