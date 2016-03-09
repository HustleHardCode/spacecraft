var spaceCraft =
{
	fire: function () {
		return 'SpaceCraft - fire'
	},
	sayMeow: function ()
	{
		return 'Мяу';
	},
	moveForward: function () {
		return ' SpaceCraft move forward ';
	},
	rotateLeft: function ()
	{
		return ' SpaceCraft rotate right ';
	},
	rotateRight: function ()
	{
		return ' SpaceCraft rotate left ';
	},
	sleep: function ()
	{
		return ' sleep ';
	}
};

BBotDebug(spaceCraft.moveForward());
for (var i = 0; i < Math.min(1, 3); ++i)
	BBotDebug(spaceCraft.fire());
BBotDebug(spaceCraft.sayMeow());
BBotDebug(spaceCraft.rotateLeft());
BBotDebug(spaceCraft.sleep());

