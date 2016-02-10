/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.welcome');

app.controller('WelcomeController', ['$scope', '$storage', '$state', '$sce',
	function ($scope, $storage, $state, $sce)
	{
		var str = $storage.local.getItem("statistic") || null;

		var masJSON = str === null ? 0 : $storage.local.getItem("statistic").split(';');
		var j;
		$scope.carouselWelcome = carousel;
		$scope.interval = 10000;

		$scope.labels = makeLabels();
		$scope.takeBonus = [];
		$scope.killSpaceCraft = [];
		$scope.totaleScore = [];
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
			var mas = [];
			if (masJSON !== 0)
			{
				for (var i = 1; i <= masJSON.length; i++)
				{
					mas.push(i);
				}
			}
			return mas.push(0);
		}

		function makeStatistic()
		{
			if (masJSON !== 0)
			{
				masJSON.forEach(function(s,i,masJson){
					j = JSON.parse(s);
					$scope.takeBonus.push(j.takenBonus);
					$scope.killSpaceCraft.push(j.killEnemy);
					$scope.totaleScore.push(j.totalScore);
				})
			}
		}
	}]);
