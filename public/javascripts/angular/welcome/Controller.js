/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.welcome');

app.controller('WelcomeController', ['$scope', '$storage', '$state', '$sce',
	function ($scope, $storage, $state, $sce)
	{
		var stat = $scope.stat = JSON.parse($storage.local.getItem("statistic"));
		$scope.index = 0;

		$scope.labels = [];
		$scope.seriesC = ['Уничтоженные корабли'];
		$scope.seriesB = ['Собранные бонусы'];
		$scope.seriesT = ['Общее количество очков'];

		// Формирует подписи оси ординат исходя из длины массива
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
			if (stat)
			{
				for (var i = 1; i <= stat.length; i++)
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
			if (stat)
			{
				stat.forEach(function (s)
				{
					$scope.takeBonus[0].push(s.takenBonus);
					$scope.killSpaceCraft[0].push(s.killEnemy);
					$scope.totaleScore[0].push(s.totalScore);
				})
			}
		}

		$scope.changeChart = function()
		{
			$scope.index = ($scope.index + 1) % 3;
		}
	}]);
