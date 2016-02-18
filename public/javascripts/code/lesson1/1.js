// Когда я писал этот код, только Бог и я понимали, что он означает.
// Теперь понимает только Бог.
var spaceCraft =
{
	fire: function ()
	{
		return 'SpaceCraft - fire'
	},
	moveForward: function ()
	{
		return ' SpaceCraft move forward ';
	},
	rotateLeft: function ()
	{
		return ' SpaceCraft rotate right ';
	},
	rotateRight: function ()
	{
		return ' SpaceCraft rotate left ';
	}
};

BBotDebug(spaceCraft.moveForward());

for (var i = 0; i < 1; ++i)
{
	BBotDebug(spaceCraft.fire());
}
BBotDebug(spaceCraft.rotateLeft());
BBotDebug(' BBot ');
