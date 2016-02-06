/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.result');

app.controller('ResultController', ['$scope', '$state', 'statistics', '$storage',
	function ($scope, $state, statistics, $storage)
	{
		$scope.player = statistics.getPlayer();

		var stat = $scope.stat = $storage.local.getItem("statistic") || [];
		//$scope.labels = ["Kill enemy", "Death", "Total score"];
        //
		//var kill = 0;
		//var total = 0;

		if ((typeof stat == "object") && (stat instanceof Array))
		{
			stat.push($scope.player);
			$storage.local.setItem("statistic", stat);

			//stat.forEach(function (s, i, atat)
			//{
			//	kill += s.getKillEnemy();
			//	total += s.getTotalScore();
			//});

		} else
		{
			var newmas = [stat, $scope.player];
			$storage.local.setItem("statistic", newmas);
		}

		//$scope.data = [kill, stat.length, total];


		VK.Widgets.Group("vk_groups", {
			mode: 0,
			width: "auto",
			height: "100",
			color1: 'FFFFFF',
			color2: '25282C',
			color3: '152B39'
		}, 105816682);

		$scope.reload = function ()
		{
			$state.go('game');
		};
	}]);
