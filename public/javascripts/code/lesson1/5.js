function check(value, mod)
{
	return value % mod === 0;
}

function calculateNumber(x, y)
{
	return x + y;
}

var spaceCraft =
{
	fire: function () {
		return 'SpaceCraft - fire'
	},
	moveForward: function () {
		return ' SpaceCraft move forward ';
	},
	rotateLeft: function () {
		return ' SpaceCraft rotate right ';
	},
	rotateRight: function () {
		return ' SpaceCraft rotate left ';
	}
};

function sumMinMax(a, b, c, d) {
	return Math.min(a, b, c, d) + Math.max(a, b, c, d);
}

var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = '';
array.forEach(function(value) {
	if (check(value, 2))
	{
		result += spaceCraft.rotateRight();
	}
	else {
		result += spaceCraft.rotateRight();
	}

	result += spaceCraft.fire();
	result += spaceCraft.moveForward();
});

BBotDebug(result);
