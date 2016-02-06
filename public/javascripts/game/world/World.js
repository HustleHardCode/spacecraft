'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var World = function (spec)
{
    var that = {};

	var game = spec.game;
    var bounds = spec.bounds;

    var objects = [];

    that.spaceCraftType = 0;
    that.bonusType = 1;

	that.decorations = Decorations();
	that.factory = EntitiesFactory({game: game, world: that});

	that.pushObject = function (obj)
    {
        objects.push(obj);
    };

    that.removeObject = function (obj)
    {
        objects.removeElement(obj);
    };

    that.get = function (id)
    {
        var result;

        objects.forEach(function(e)
        {
           if (e.getId() === id)
           {
               result = e;
           }
        });

        return result;
    };

    that.getObjects = function ()
    {
        return objects;
    };

    that.getSpaceCraft = function (id)
    {
        var result;

        objects.forEach(function (o)
        {
            if (o.getType() === that.spaceCraftType)
            {
                if (o.getId() === id)
                {
                    result = o;
                }
            }
        });

        return result;
    };

    that.getSpaceCrafts = function (id)
    {
        var spaceCrafts = [];

        objects.forEach(function (e)
        {
            if (e.getType() === that.spaceCraftType && e.getId() !== id)
            {
                spaceCrafts.push(e);
            }
        });

        return spaceCrafts;
    };

    that.getBounds = function ()
    {
        return bounds;
    };

    // Получить массив бонусов
    that.getBonuses = function (callback)
    {
        var bonuses = [];

        objects.forEach(function (e)
        {
            if (e.getType() === that.bonusType)
            {
                bonuses.push(e);
            }
        });

        if (callback)
        {
            bonuses.forEach(function (e, i, arr) {
                callback(e, i, arr);
            })
        }

        return bonuses;
    };

    that.update = function ()
    {
        // Проходимся по всем бонусом смотрим были ли коллизии с кораблем
        that.getBonuses(function (b)
        {
            b.update();
        });

        that.getSpaceCrafts().forEach(function (e)
        {
            e.update();
        });

        that.decorations.update();
    };

    /**
     * Возвращает бонусы в рендже.
     *
     * @param sprite - объект-центр от кторого считаем рендж
     * @param range - рендж
     * @param callback - каллбек, который мы используем для каждого бонуса.
     * @returns {Array}
     */
    that.bonusInRange = function (sprite, range, callback)
    {
        var a = [];

        game.sc.world.getBonuses().forEach(function (e)
        {
            if (Phaser.Point.distance(sprite, e.sprite) < range)
            {
                a.push(BonusApi(e));
            }
        });

        if (callback)
        {
            a.forEach(function (e, i, arr)
            {
                callback(e, i, arr);
            });
        }

        return a;
    };

    return that;
};
