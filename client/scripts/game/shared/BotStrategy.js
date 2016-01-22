'use strict';

var botStrategy = function (spec)
{
	var sc = spec.game.sc;
	var spaceCraft = spec.spaceCraft;

    var bounds = sc.world.getBounds();

    var tryMoveForward = spaceCraft.engine.moveForward;

    if (spaceCraft.getX() - 200 < bounds.x
        || spaceCraft.getY() - 200 < bounds.y
        || spaceCraft.getX() + 200 > bounds.x + bounds.width
        || spaceCraft.getY() + 200 > bounds.y + bounds.height)
    {
        tryMoveForward = spaceCraft.engine.rotateLeft;
		tryMoveForward();
		tryMoveForward = spaceCraft.engine.moveForward;
		tryMoveForward();
    }


    /**
     * Враг, к которому мы летим, либо стреляем.
     */
    var eArr =  spaceCraft.weapon.enemiesInRange();
    var enemy = eArr[utils.randomArbitrary(0, eArr.length)];

    /**
     * Бонус, к которому мы летим.
     */
    var bonus;

    var eMin = Number.MAX_VALUE;
    var bMin = Number.MAX_VALUE;


    function bonusGenerate()
    {
        sc.world.bonusInRange(spaceCraft.sprite, spaceCraft.weapon.getFireRange(), function (b)
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
    }

    // Если есть в раг в радиусе атаки корабля, то
    // Стреляем по нему. Ищем ближайший бонус
    if (enemy)
    {
        spaceCraft.weapon.fire(enemy);

        // Поиск ближайшего бонуса и сохранение в bonus.
        bonusGenerate();

        // Если он не нулл
        if (bonus)
        {
            // Поварачиваемся к нему и плывем
            spaceCraft.engine.rotateTo(bonus);
            tryMoveForward();
        }
    }
    else
    {
        // Если врага в радиусе атакие нет, то ищем ближайшего врага в мире.
        sc.world.getSpaceCrafts().forEach(function(e)
        {
            if (e !== spaceCraft)
            {
                var distance = spaceCraft.distance(e);

                if (distance < eMin)
                {
                    eMin = distance;
                    enemy = e;
                }
            }
        });

        // Поиск ближайшего бонуса и сохранение в bonus.
        bonusGenerate();

        // Если дистанция до бонуса меньше, чем до корабля, летим до бонуса.
        // Иначе плывем к врагу.
        if (bMin < eMin)
        {
            spaceCraft.engine.rotateTo(bonus);
            tryMoveForward();
        }
        else
        {
            if (enemy)
            {
                spaceCraft.engine.rotateTo(enemy);
                tryMoveForward();

                if (spaceCraft.weapon.inRange(enemy))
                {
                    spaceCraft.weapon.fire(enemy);
                }
            }
        }
    }
};
