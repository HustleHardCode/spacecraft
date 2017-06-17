'use strict';

var resolvesNames = require('./welcome.resolve').names;

WelcomeController.$inject = ['$scope',
							 '$sce',
							 'authentication',
							 'authService',
							 resolvesNames.lessonStatistics,
							 resolvesNames.leaderBoard,
							 resolvesNames.userProgress,
							 resolvesNames.userInfo];

module.exports = WelcomeController;

var lodash = require('lodash');
var moment = require('moment');

/**
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function WelcomeController($scope,
						   $sce,
						   authentication,
						   authService,
						   lessonStatisticsData,
						   leaderBoardData,
						   userProgressData,
						   userInfoData) {

	$scope.active = 0;

	var duration = moment.duration(10, 'seconds');

	$scope.leaderBoard = leaderBoardData || [];	// Лидеры игры
	$scope.vkShow = true; 	// Переключатель виджета ВК

	// Настройка карусели
	$scope.isNoLoopSlides = false; // Флаг указывает ациклична ли карусель
	$scope.intervalSlideChange = duration.asMilliseconds();

	$scope.chartIndex = 0;	// Номер текущего графика
	$scope.labels = [];		// Лейблы графика
	$scope.showLineGraphic = false;

	$scope.seriesT = ['Общее количество очков'];
	$scope.labelsL = ['Изученные уроки', 'Неизученные уроки'];

	$scope.logout = logout;
	$scope.trustAsHtml = trustAsHtml;

	$scope.userInfo = userInfoData;

	// Т.к. в новой версси графиков нельзя переопределить цвет
	// графки при новедении, необходимо задать общую настройку цветов.
	// backgroundColor - цвет при наведении(hover)
	// pointBackgroundColor - цвет графика в обычном состоянии(да да бред но это так)
	$scope.pieChartColors = [{
		backgroundColor: '#435560', // Первая половинка пирога
		pointBackgroundColor: '#152B39',
		pointHoverBackgroundColor: '#152B37',
		borderColor: '#152B39',
		pointBorderColor: '#152B39',
		pointHoverBorderColor: '#152B37'
	}, {
		backgroundColor: '#C5C8C3', // Вторая половинка графика
		pointBackgroundColor: '#C5C8C6',
		pointHoverBackgroundColor: '#C5C8C4',
		borderColor: '#C5C8C1',
		pointBorderColor: '#C5C8C1',
		pointHoverBorderColor: '#C5C8C4'
	}];

	formDataForChart(lessonStatisticsData);
	formDataForLineChart(userProgressData);

	// Инифиализация ВК
	initVK();

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
	function formDataForChart(lessonStatisticsData) {

		// Забираем уроки из ответа.
		// Ответ может быть и пустым.
		var lessons = lessonStatisticsData.lessons || [];

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
	 * Функция формирует данные для графика
	 * Данные -  приходит  массив
	 * и сами данные для графика должны находится в массиве
	 */
	function formDataForLineChart(userProgress) {

		if (!lodash.isEmpty(userProgress)) {

			// Подготовка данных для вывода графика,
			// представление данных [[1,2,3],[3,4,5]] - 2 графика
			$scope.totalScore = [userProgress];

			// Задаем подписи оси оХ
			// (соответсвие индексов данного массива к массиву результатов )
			$scope.labels = [];

			for (var i = 1; i <= lodash.first($scope.totalScore).length; i++) {

				$scope.labels.push(i);

			}

		} else {

			$scope.totalScore = [[0]];
			$scope.labels = [1];

		}

		$scope.seriesT = ['Последние полученные очки'];
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

			if (v) {

				if (v[predicate]) {

					c += v[param2];

				}
				else {

					c += v[param1];

				}

			}

		});

		return c;

	}

	// Проверка мошеничества
	function trustAsHtml(s) {

		return $sce.trustAsHtml(s);

	}

	/**
	 * Выход из системы.
	 */
	function logout() {

		authentication.logout({success: authService.loginCancelled});

	}
}
