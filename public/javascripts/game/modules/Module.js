'use strict';

/**
 * Created by vladthelittleone on 06.11.15.
 */
var Module = function (spec)
{
    var that = {};

    var manager = spec.modulesManager;

    var energyPoints = manager.getPoints(spec.energyPoints) || 0;

    var values = that.values = spec.values;
    var max = values.length;

    that.get = function(index)
    {
        index -= 1;

        if(index < 0)
        {
            return values[0];
        }
        else if(index > values.length)
        {
            return values[values.length];
        }

        return values[index];
    };

    that.inc = function (i)
    {
        var range = max - energyPoints;
        var points = 1 > range ? 0 : 1;

        if (i)
        {
            points = i > range ? range : i;
        }

        energyPoints += manager.getPoints(points);
    };

    that.dec = function (i)
    {
        function decOn(num)
        {
            var delta = energyPoints - num;

            if (delta >= 0)
            {
                manager.addToFreePoints(num);
                energyPoints = delta;
            }
            else
            {
                manager.addToFreePoints(energyPoints);
                energyPoints = 0;
            }
        }

        if (i)
        {
            decOn(i);
        }
        else
        {
            decOn(1);
        }
    };

    that.getMax = function ()
    {
        return max;
    };

    that.getEnergyPoints = function ()
    {
        return energyPoints;
    };

    return that;
};

var RateModule = function (spec)
{
    var that = Module(spec);

    that.getFireRate = function ()
    {
        var i = that.getEnergyPoints() - 1;

        if (i === -1)
        {
            return 0;
        }

        return that.values[i];
    };

    return that;
};

var RangeModule = function (spec)
{
    var that = Module(spec);

    that.getFireRange = function ()
    {
        var i = that.getEnergyPoints() - 1;

        if (i === -1)
        {
            return 0;
        }

        return that.values[i];
    };

    return that;
};

var DamageModule = function (spec)
{
    var that = Module(spec);

    that.getDamage = function ()
    {
        var i = that.getEnergyPoints() - 1;

        if (i === -1)
        {
            return 0;
        }

        return that.values[i];
    };

    that.addDamage = function (add)
    {
        that.values.forEach(function (e, i, a)
        {
            a[i] = e + add;
        });
    };

    return that;
};

var RegenerationModule = function (spec)
{
    var that = Module(spec);

    that.getRegeneration = function ()
    {
        var i = that.getEnergyPoints() - 1;

        if (i === -1)
        {
            return 0;
        }

        return that.values[i];
    };

    return that;
};

var MoveSpeedModule = function (spec)
{
    var that = Module(spec);

    that.getMoveSpeed = function ()
    {
        var i = that.getEnergyPoints() - 1;

        if (i === -1)
        {
            return 0;
        }

        return that.values[i];
    };

    return that;
};
