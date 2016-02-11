/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.welcome');

app.controller('WelcomeController', ['$scope', '$storage', '$state', '$sce',
	function ($scope, $storage, $state, $sce)
	{
		// Массив данных для карусели и интервал смены
		$scope.carouselWelcome = carousel;
		$scope.interval = 10000;

		var str = $storage.local.getItem("statistic") || null;

		// Если удалось получить из хранилища статистику формируем массив JSON объектов
		var masJSON = str === null ? 0 : $storage.local.getItem("statistic").split(';');
		var j;
		$scope.labels = [];
		$scope.series = ['User Stastic'];
		// Формирует подписи оси ординат исходя из длины ьассива masJSON
		makeLabels();

		$scope.takeBonus = [[]];
		$scope.killSpaceCraft = [[]];
		$scope.totaleScore = [[]];

		// Складывает в массивы информацию о пользователе
		makeStatistic();

		VK.Widgets.Group("vk_groups", {
			mode: 0,
			width: "auto",
			height: "345",
			color1: 'FFFFFF',
			color2: '25282C',
			color3: '152B39'
		}, 105816682);

		$scope.trustAsHtml = function (s)
		{
			return $sce.trustAsHtml(s);
		};

		$scope.goToTricks = function ()
		{
			$storage.local.removeItem('tipsAndTricks');
			$state.go("game");
		};

		function makeLabels()
		{
			if (masJSON !== 0)
			{
				for (var i = 1; i <= masJSON.length; i++)
				{
					$scope.labels.push(i);
				}
			}
			else
			{
				$scope.labels.push(0);
			}
		}

		function makeStatistic()
		{
			if (masJSON !== 0)
			{
				masJSON.forEach(function (s, i, masJson)
				{
					j = JSON.parse(s);
					$scope.takeBonus[0].push(j.takenBonus);
					$scope.killSpaceCraft[0].push(j.killEnemy);
					$scope.totaleScore[0].push(j.totalScore);
				})
			}
		}
	}]);
