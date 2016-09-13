'use strict';

WelcomeController.$inject = ['$scope', '$state', '$sce', 'authentication', 'connection'];

module.exports = WelcomeController;

/**
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function WelcomeController($scope, $state, $sce, authentication, connection) {

	$scope.leadersList = [];	// Лидеры игры
	$scope.showLeaderboard = false;	// Переключатель таблицы лидеров
	$scope.vkShow = true; 	// Переключатель виджета ВК

	$scope.chartIndex = 0;	// Номер текущего графика
	$scope.labels = [];		// Лейблы графика

	$scope.seriesT = ['Общее количество очков'];
	$scope.labelsL = ['Изученные уроки', 'Неизученные уроки'];

	$scope.changeChart = changeChart;
	$scope.logout = logout;
	$scope.trustAsHtml = trustAsHtml;

	$scope.openLessons = connection.metrics.hitOpenLesson();
	
	/**
	 * Формирование статистики по всем параметрам.
	 */
	connection.getLessonsStatistics(formDataForChart);

	connection.getLeaderboard(formLeaderboard);

	// Инифиализация ВК
	initVK();

	authentication.currentUser(initUser);

	// ==================================================

	/**
	 * Инициализация виджета ВК.
	 */
	function initVK() {

		try {

			VK.Widgets.Group("vk_groups", {
				mode:   0,
				width:  "auto",
				height: "345",
				color1: 'FFFFFF',
				color2: '25282C',
				color3: '152B39'
			}, 105816682);

		}
		catch (e) {

			// При ошибке не показываем виджет
			$scope.vkShow = false;

		}

	}

	function formLeaderboard(res) {

		$scope.leadersList = res.data;

		// Открываем таблицу лидеров, так как все
		// данные загрузились
		$scope.showLeaderboard = true;

	}

	/**
	 * Формирование данных для графика.
	 *
	 * lessons это массив элементов, каждый из которых,
	 * по крайней мере, имеет следующие поля:
	 * subLessonCount, currentSubLesson, completed.
	 *
	 * subLessonCount - кодичество подуроков.
	 * currentSubLesson - текущий подурок.
	 * completed - был ли уже пройден урок.
	 */
	function formDataForChart(res) {

		// Забираем уроки из ответа.
		// Ответ может быть и пустым.
		var lessons = res.data.lessons || [];

		// Кол-во подуроков
		var subLessonCount = sum(lessons, 'subLessonCount') || 100;

		// Добавляем полное кол-во уроков, если он уже был пройден,
		// иначе номер текущего урока.
		var end = sum(lessons, 'currentSubLesson', 'subLessonCount', 'completed');

		// Вычитаем из общего размера.
		var notEnd = subLessonCount - end;

		$scope.dataL = [end, notEnd];

	}

	/**
	 * Суммирование по параметру элементов массива массива.
	 *
	 * @param a массив, параметры елементов которого суммируются.
	 * @param param1 параметр элемента, который суммируется, если predicate элемента равен false.
	 * @param param2 параметр элемента, который суммируется, если predicate элемента равен true.
	 * @param predicate условие при котором param1, param2 элементов складываются
	 * @returns {number} сумма
	 */
	function sum(a, param1, param2, predicate) {

		var c = 0;

		a.forEach(function (v) {

			if (v[predicate]) {

				c += v[param2];

			}
			else {

				c += v[param1];

			}

		});

		return c;

	}

	// Проверка мошеничества
	function trustAsHtml(s) {

		return $sce.trustAsHtml(s);

	}

	// Изменить текущий график на следующий
	function changeChart() {

		// Реализовать переключение графиков
		//	$scope.chartIndex = ($scope.chartIndex + 1) % 2;

	}

	// Инициализация пользователя
	function initUser(user) {

		$scope.mail = user && user.email;

	}

	/**
	 * Выход из системы.
	 */
	function logout() {

		authentication.logout({

			success: function () {

				// Переход на страницу авторизации
				$state.go('login');

			}

		});
	}
}
