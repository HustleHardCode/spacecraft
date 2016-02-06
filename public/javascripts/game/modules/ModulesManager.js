'use strict';

/**
 * Created by vladthelittleone on 06.11.15.
 * @constructor
 */
var ModulesManager = function (spec)
{
    var that = {};

    var maxPoints = spec.energyPoints;
    var freePoints = spec.energyPoints;

    that.getPoints = function (i)
    {
        var delta = freePoints - i;
        var result = i;

        if (delta >= 0)
        {
            freePoints = delta;
        }
        else
        {
            result = freePoints;
            freePoints = 0;
        }

        return result;
    };

    that.getFreePoints = function ()
    {
        return freePoints;
    };

    that.addToFreePoints = function (a)
    {
        freePoints += a;

        return freePoints;
    };

    that.getMaxPoints = function ()
    {
        return maxPoints;
    };

    return that;
};
