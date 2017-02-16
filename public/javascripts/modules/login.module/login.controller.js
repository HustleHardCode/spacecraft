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

	$scope.loginByKey = loginByKey;
	$scope.register = register;
	$scope.login = login;

	// ==================================================

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
	function error(errorDescription) {

		$scope.error = errorDescription;

	}

	/**
	 * Вход в систему.
     */
	function login() {

		authentication.login($scope.email,
							 $scope.password,
							 error);

	}

}
