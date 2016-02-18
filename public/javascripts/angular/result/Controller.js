/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.result');

app.controller('ResultController', ['$scope', '$state', 'statistics', '$storage',
	function ($scope, $state, statistics, $storage)
	{
		$scope.player = statistics.getPlayer();

		// Получаем статистику из хранилища,  если нет то нулл( первый раз  играет)
		// В хранилище храниятся строка из JSON объектов
		// Если статистики нет, то создаем пустой массив
		var stat = JSON.parse($storage.local.getItem("statistic")) || [];

		// Добавляем новый результат
		stat.push({
			killEnemy: $scope.player.getKillEnemy(),
			takenBonus: $scope.player.getTakenBonus(),
			totalScore: $scope.player.getTotalScore(),
			acceptDamage: $scope.player.getAcceptDamage(),
			takenDamage: $scope.player.getTakenDamage()
		});

		$storage.local.setItem("statistic", JSON.stringify(stat));

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
