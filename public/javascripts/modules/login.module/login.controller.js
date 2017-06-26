'use strict';

const lodash = require('lodash');

LoginController.$inject = ['$scope', '$state', '$window', 'authentication', 'spinner'];

module.exports = LoginController;

/**
 * Контроллер авторизации пользователя.
 *
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function LoginController($scope, $state, $window, authentication, spinner) {

	// Переменная отвечающая за отображение нужной формы
	$scope.isEnterForm = true;

	// По дефолту считаем, что человек согласен на рассылку
	$scope.subscriptionToMailingFlag = true;

	$scope.changeForm = changeForm;
	$scope.changeSubscriptionToMailingFlag = changeSubscriptionToMailingFlag;
	$scope.register = register;
	$scope.login = login;
	$scope.loginByVK = loginByVK;

	$scope.startLoginSpinner = startLoginSpinner;
	$scope.stopLoginSpinner = stopLoginSpinner;

	$scope.submitForm = submitForm;
	$scope.onInputFormChange = onInputFormChange;
	$scope.isFormInvalidAfterSubmit = isFormInvalidAfterSubmit;

	stopLoginSpinner();

	// ==================================================

	/**
	 * Обработка отправки формы пользователем.
	 */
	function submitForm() {

		$scope.isEnterForm ? login() : register();

		// Очищаем старое сообщение после отправки формы.
		$scope.errorMessage = null;

	}

	/**
	 * Изменение состояния ввода какого-либо input'a формы.
	 * Взаимодействие с формой пользователем также осуществляется в момент, когда он
	 * изменяет поля ввода. В такие момент нужно изменять ЯВНО флаг $submitted у формы
	 * и очищать старое сообщение об ошибке (если оно было).
	 */
	function onInputFormChange() {

		$scope.loginForm.$submitted = false;
		$scope.errorMessage = null;

	}

	function isFormInvalidAfterSubmit() {

		return $scope.loginForm.$submitted && $scope.loginForm.$invalid;

	}

	function changeSubscriptionToMailingFlag() {

		$scope.subscriptionToMailingFlag = !$scope.subscriptionToMailingFlag;

	}

	function changeForm() {

		$scope.isEnterForm = !$scope.isEnterForm;

	}

	function startLoginSpinner(message) {

		spinner.start({message:message, delay: 0});

	}

	function stopLoginSpinner() {

		spinner.stop();

	}

	/**
	 * Вызывается в случае успешной регистрации.
	 * Реализует логику вызова логирования и указания переходу к первому уроку.
	 */
	function onSuccessfulRegistration() {

		// Переопределяем success callback для метода логирования.
		login(function () {

			$state.go('lesson', {id: 0});

		});

	}

	/**
	 * Регистрация в сервисе
	 */
	function register() {

		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {

			startLoginSpinner('Регистрация...');

			// В случае успешной регистрации делаем вызов метода логина (авторизуемся автоматически).
			authentication.register({
										email:                     $scope.email,
										password:                  $scope.password,
										subscriptionToMailingFlag: $scope.subscriptionToMailingFlag,
										success:                   onSuccessfulRegistration,
										error:                     controllerErrorHandler
									});

		}

	}

	/**
	 * Обработка ошибочной ситуации в контроллере.
	 * Метод принимает сообщение, которое необходимо отобразить клиенту.
	 * Если сообщение не задано (к примеру, данный коллбэк указывали в качестве обработчика
	 * ошибочной ситуации при авторизации и сервис не отвечает) -> указываем сообщение по умолчанию.
	 */
	function controllerErrorHandler(errorDescription) {

		stopLoginSpinner();

		$scope.errorMessage = errorDescription ? errorDescription :
							  "Что-то пошло не так, пожалуйста, попробуйте еще раз.";

	}

	/**
	 *  Метод возвращает имя следующего состояния для перехода после окончания авторизации.
	 *  Метод опирается на наличие истории state'ов в сервисе $state.
	 *  По умолчанию для перехода считается состояние 'welcome'.
     */
	function getNextStateName() {

		let nextStateName = 'welcome';

		if (!lodash.isEmpty($state.history)) {

			const previousStateIndex = $state.history.length - 2;
			const nextStateNameFromHistory = $state.history[previousStateIndex];

			// Во избежание 'зацикливания' перехода, текущее состояние НЕ рассматриваем :)
			if (nextStateNameFromHistory && nextStateNameFromHistory.name !== $state.current.name) {

				nextStateName = nextStateNameFromHistory.name;

			}


		}

		return nextStateName;

	}

	/**
	 * Вход в систему.
	 * Метод позволяет задать конкретное поведение в случае успешного логирования.
	 * По умолчанию, производится вызов метода prepareSuccessfulLogin.
	 */
	function login(onSuccess) {

		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {

			startLoginSpinner('Аутентификация...');

			authentication.login({
									 email:    $scope.email,
									 password: $scope.password,
									 success:  function () {

										 stopLoginSpinner();

										 const nextState = getNextStateName();

										 onSuccess ? onSuccess() : $state.go(nextState);

									 },
									 error:    controllerErrorHandler
								 });

		}

	}

	function loginByVK() {

		startLoginSpinner('Заходим через ВКонтакте...');

		$window.location.href = '/vk/';

	}

}
