'use strict';

/**
 * Created by Ivan on 24.10.2015.
 */
var Statistic = function ()
{
    var that = {},
        takenBonus = 0,
        killEnemy = 0,
        takenDamage = 0,
        acceptDamage = 0,
        totalScore ;

    that.addBonus = function ()
    {
        takenBonus++;
    };

    that.addKillEnemy = function ()
    {
        killEnemy++;
    };

    that.addTakenDamage = function (damage)
    {
        takenDamage += damage;
    };

    that.addAcceptDamage = function (damage)
    {
        acceptDamage += damage;
    };

    that.calculateTotalScore = function ()
    {
        totalScore = takenBonus * 2 + killEnemy * 10 - takenDamage + acceptDamage * 2;
        
        if (totalScore < 0)
        {
            totalScore = 0;
        }
    };

    that.getTotalScore = function ()
    {
        return totalScore;
    };

    that.getTakenDamage = function ()
    {
        return takenDamage;
    };

    that.getKillEnemy = function ()
    {
        return killEnemy;
    };

    that.getAcceptDamage = function ()
    {
        return acceptDamage;
    };

    that.getTakenBonus = function ()
    {
        return takenBonus;
    };

    return that;
};
