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
		var stat = $scope.stat = $storage.local.getItem("statistic") || null;

		// Создаем новый JSON
		var str;
		var newStat = {
			killEnemy: $scope.player.getKillEnemy(),
			takenBonus: $scope.player.getTakenBonus(),
			totalScore: $scope.player.getTotalScore(),
			acceptDamage: $scope.player.getAcceptDamage(),
			takenDamage: $scope.player.getTakenDamage()
		};

		// Проверка на первую игру
		if (stat === null)
		{
			// Превращаем JSON в строку и глядем в хранилище
			str = JSON.stringify(newStat);
			$storage.local.setItem("statistic", str);
		} else
		{
			// Соединяем хранидище и новую  статистику
			// Разделяем объекты ; для дальнейшей сериализации
			str = stat + ";" + JSON.stringify(newStat);
			$storage.local.setItem("statistic", str);
		}

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
