// Слишком пьян, исправить позже.
var spaceCraft = function () {
	var that = {};

	that.fire = function () {
		return 'SpaceCraft - fire'
	};

	that.fire = function (n) {
		var msg = '';
		// Магия. Не трогать.
		for (var i = 3; i <= n + 2; ++i)
			msg += 'SpaceCraft fire ';

		return msg;
	};

	that.moveForward = function () {
		return ' SpaceCraft move forward ';
	};

	that.min = function (a, b) {
		return a > b ? b : a;
	};

	return that;
};
var BBot = {
	rotateLeft: function () {
		return ' SpaceCraft rotate right ';
	},
	rotateRight: function () {
		return ' SpaceCraft rotate left ';
	},
	BBotDebug: function (say) {
		return say;
	}
};

BBotDebug(spaceCraft().moveForward());
BBotDebug(spaceCraft().fire(spaceCraft().min(1, 3)));
BBotDebug(BBot.rotateLeft());
BBotDebug(BBot.BBotDebug(' BBot '));


