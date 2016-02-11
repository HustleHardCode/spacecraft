/**
 * Created by vladthelittleone on 20.11.15.
 * @constructor
 */
var Decorations = function (spec)
{
    var that = {};
    var objects = [];

    that.push = function (obj)
    {
		objects.push(obj);
    };

    that.update = function ()
    {
        objects.forEach(function (o)
        {
            o.update();
        });
    };

    return that;
};
