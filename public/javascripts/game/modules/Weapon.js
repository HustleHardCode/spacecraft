'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var WeaponBlock = function (spec)
{
    var that = {};

    //===================================
    //============== INIT ===============
    //===================================

	var game = spec.game;
	var sc = game.sc;

    var spaceCraft = spec.spaceCraft;
    var sprite = spaceCraft.sprite;
    var spriteName = spec.spriteName;
    var velocity = spec.velocity;
    var fireTime = 0;

    // Объявляем группу коллизий.
    var beamsCollisionGroup = game.physics.p2.createCollisionGroup();
	game.physics.p2.updateBoundsCollisionGroup();

    //  Группа пуль.
    var beams = game.add.group();

    // Массив выпущенных снарядов
    var beamsArray = [];

    // Модули
    var range = that.range = RangeModule({
        modulesManager: spec.modulesManager,
        values: [100, 150, 200, 250],
        energyPoints: 3
    });

    var rate = that.rate = RateModule({
        modulesManager: spec.modulesManager,
        values: [650, 600, 550, 500],
        energyPoints: 3
    });

    var damage = that.damage = DamageModule({
        modulesManager: spec.modulesManager,
        values: [5, 10, 15, 20],
        energyPoints: 2
    });

    beams.setAll('anchor.x', 0.5);
    beams.setAll('anchor.y', 0.5);
    beams.setAll('outOfBoundsKill', true);
    beams.setAll('checkWorldBounds', true);

    beams.enableBody = true;
    beams.physicsBodyType = Phaser.Physics.P2JS;

    //===================================
    //============== PRIVATE ===============
    //===================================

    function initApi()
    {
        that.incDamage = damage.inc;
        that.incRange = range.inc;
        that.incRate = rate.inc;

        that.decRate = rate.dec;
        that.decRange = range.dec;
        that.decDamage = damage.dec;

        that.getRateEnergy = rate.getEnergyPoints;
        that.getRangeEnergy = range.getEnergyPoints;
        that.getDamageEnergy = damage.getEnergyPoints;
        that.getFireRate = rate.getFireRate;
        that.getFireRange = range.getFireRange;
        that.getDamage = damage.getDamage;
        that.getFireRateByPoints = rate.get;
        that.getFireRangeByPoints = range.get;
        that.getDamageByPoints = damage.get;

        that.addDamage = damage.addDamage;
    }

    function beamHit(u)
    {
        return function (unit, beam)
        {
            if (beam.sprite)
            {
                if (!utils.randomInt(0, 3))
                {
                    sc.world.factory.createExplosion({
						x: beam.sprite.x,
						y: beam.sprite.y,
						scale: 0.3
					});
                }

                beam.sprite.destroy();
                beam.destroy();

                // Наносим урон
                u.hit(damage.getDamage(), spaceCraft);
                spaceCraft.statistic.addAcceptDamage(spaceCraft.weapon.getDamage());
                u.statistic.addTakenDamage(damage.getDamage());

            }
        };
    }

    //===================================
    //============== THAT ===============
    //===================================

    that.update = function ()
    {
        // Проходимся по всем снарядам выпущенным кораблем
        beamsArray.forEach(function (b, i)
        {
            // Проверка вышел ли  снаряд за range ружия
            if (Phaser.Point.distance(sprite, b) > range.getFireRange())
            {
                if (b.body)
                {
                    // Уничтожаем спрайт снаряда и удаляем его из массива снарядов
                    b.body.destroy();
                    b.destroy();
                    beamsArray.removeElementByIndex(i);
                }
            }
        });

        var units = sc.world.getSpaceCrafts(spaceCraft.getId());

        units.forEach(function (u)
        {
            // Callback при коллизии пули с кораблем
            u.sprite.body.collides(beamsCollisionGroup, beamHit(u));
        });
    };

    that.inRange = function (another)
    {
        return spaceCraft.distance(another) < range.getFireRange();
    };

    that.fire = function (obj1, obj2)
    {
        var x = obj1,
            y = obj2;

        // Если урон или скорострельность, диапозон равен нулю, не стреляем.
        if (!rate.getFireRate() ||
            !range.getFireRange() ||
            !damage.getDamage())
        {
            return;
        }

        // Проверка делэя. Не стреляем каждый фрэйм.
        if (game.time.now > fireTime)
        {
            var beam = beams.create(sprite.body.x, sprite.body.y, spriteName);

            // Добавляем выпущенный снаряд в массив снарядов
            beamsArray.push(beam);

            beam.body.collideWorldBounds = false;

            // Устанавливаем маленькую массу,
            // что б при столкновении с пулей
            // кораблик не взаимодействовал с ней.
            beam.body.mass = 0.00001;

            beam.body.setCollisionGroup(beamsCollisionGroup);
            beam.body.collides(sc.collisionGroups.spaceCraft);

            if (beam)
            {
                if (!x && !y)
                {
                    // Поворот пули по направлению корабля
                    beam.body.rotation = sprite.body.rotation - (Math.PI / 2);
                }
                else
                {
                    // Првоерка на объект.
                    // Если есть x, y то это объект,
                    // например корабль
                    if ((typeof obj1.getX === 'function') && (typeof obj1.getY === 'function'))
                    {
                        x = obj1.getX();
                        y = obj1.getY();
                    }

                    // Поворот пули по x, y
                    beam.body.rotation = Math.atan2(y - beam.y, x - beam.x);
                }

                var angle = beam.body.rotation;

                beam.body.velocity.x = velocity * Math.cos(angle);
                beam.body.velocity.y = velocity * Math.sin(angle);

                fireTime = game.time.now + rate.getFireRate();
            }
        }
    };

    that.enemiesInRange = function (callback)
    {
        var a = [];

        sc.world.getSpaceCrafts(spaceCraft.getId()).forEach(function (e)
        {
            if (Phaser.Point.distance(sprite, e.sprite) < range.getFireRange())
            {
                a.push(SpaceCraftApi(e));
            }
        });

        if (callback)
        {
            a.forEach(function (e, i, arr)
            {
                callback(e, i, arr);
            })
        }

        return a;
    };

    that.fireNearestEnemy = function()
    {
        var enemy;
        var eMin = Number.MAX_VALUE;

        that.enemiesInRange(function (e)
        {
            var distance = spaceCraft.distance(e);

            if (distance < eMin)
            {
                eMin = distance;
                enemy = e;
            }
        });

        that.fire(enemy);
    };

    initApi();

    return that;
};
