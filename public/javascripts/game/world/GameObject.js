/**
 * Created by vladthelittleone on 02.12.15.
 */
var GameObject = function (spec)
{
	var that = {};

	var game = spec.game;
	var id = game.sc.seq.next();
	var type = spec.type;

	that.getId = function ()
	{
		return id;
	};

	that.getType = function ()
	{
		return type;
	};

	return that;
};
