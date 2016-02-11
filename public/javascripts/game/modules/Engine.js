'use strict';

/**
 * Created by vladthelittleone on 12.11.15.
 */
var EngineBlock = function (spec)
{
    var that = {};

	var game = spec.game;
    var spaceCraft = spec.spaceCraft;
    var sprite = spaceCraft.sprite;

    var moveSpeed = that.moveSpeed = MoveSpeedModule({
        modulesManager: spec.modulesManager,
        values: [10, 20, 30, 40],
        energyPoints: 2
    });

    that.incMoveSpeed = moveSpeed.inc;
    that.decMoveSpeed = moveSpeed.dec;
    that.getMoveSpeedEnergy = moveSpeed.getEnergyPoints;
    that.getMoveSpeed = moveSpeed.getMoveSpeed;
    that.getMoveSpeedByPoints = moveSpeed.get;

    that.rotateLeft = function ()
    {
        sprite.body.rotateLeft(moveSpeed.getEnergyPoints());
    };

    that.rotateRight = function ()
    {
        sprite.body.rotateRight(moveSpeed.getEnergyPoints());
    };

    /**
     * Поворот к объекту.
     *
     * @param another - объект
     * @returns {boolean} true/false - совершил поворот / не совершил
     */
    that.rotateTo = function (another)
    {
        var angle = spaceCraft.angleBetween(another);

        // Угол меньше 20 - не делаем поворот
        if (Math.abs(angle) > 20)
        {
            if (angle > 0)
            {
                that.rotateRight();
            }
            else
            {
                that.rotateLeft();
            }

            return true;
        }
        else
        {
            return false;
        }
    };

    that.moveForward = function ()
    {
        sprite.body.moveForward(moveSpeed.getMoveSpeed());
    };

    that.moveBackward = function ()
    {
        sprite.body.moveBackward(moveSpeed.getMoveSpeed() / 2);
    };

    that.moveTo = function (obj1, obj2)
    {
        var x = obj1,
            y = obj2;

        if (obj1)
        {
            // Проверка на объект.
            // Если есть x, y то это объект,
            // например корабль
            if ((typeof obj1.getX === 'function') && (typeof obj1.getY === 'function'))
            {
                x = obj1.getX();
                y = obj1.getY();
            }

            var point =
            {
                getX: function () {
                    return x;
                },

                getY: function () {
                    return y;
                }
            };

            that.rotateTo(point);
            that.moveForward();
        }
        else
        {
            that.moveForward();
        }
    };

    that.moveToNearestBonus = function()
    {
        var bMin = Number.MAX_VALUE;
        var bonus;

        game.sc.world.bonusInRange(sprite, spaceCraft.weapon.getFireRange(), function (b)
        {
            // Дистанция до бонуса
            var distance = spaceCraft.distance(b);

            // Поиск минимальной дистанции
            if (distance < bMin)
            {
                bMin = distance;
                bonus = b;
            }
        });

        that.moveTo(bonus);
    };


    return that;
};
