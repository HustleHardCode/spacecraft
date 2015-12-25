'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var SpaceCraft = function (spec)
{
    //===================================
    //============== INIT ===============
    //===================================

	var game = spec.game;
	var sc = game.sc;

    var that = sc.world.factory.createGameObject({
        type: sc.world.spaceCraftType
    });

    var statistic = that.statistic = Statistic();
    var modulesManager = that.modulesManager = ModulesManager({
        energyPoints: 12
    });

    // Стратегия, которая будет использоваться
    // для бота, либо игроква
    var strategy = spec.strategy;

    // Если не заданы x, y проставляем рандомные значения мира
    // Координаты корабля (спрайта)
    var x = spec.x || game.world.randomX;
    var y = spec.y || game.world.randomY;

    // Создаем спрайт
    var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

    var isAlive = true;

    sprite.name = that.getId();

    // Центрирование
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    // Включаем проверку на коллизии с границей
    sprite.checkWorldBounds = true;

    // Подключаем физику тел к кораблю
    game.physics.p2.enable(sprite);

    //  Добавляем группу коллизий
    sprite.body.setCollisionGroup(sc.collisionGroups.spaceCraft);
    sprite.body.collides(sc.collisionGroups.bonus);

    // Поварачиваем корабль на init-угол
    !spec.angle || (sprite.body.angle = spec.angle);

	var keyboardListener = that.keyboardListener = KeyboardListener(game);

    var engine = that.engine = EngineBlock({
        modulesManager: modulesManager,
        spaceCraft: that,
		game: game
	});

    var protection = that.protection = ProtectionBlock({
        sprite: sprite,
        health: spec.health,
        shield: spec.shield,
        modulesManager: modulesManager,
		spriteShield: spec.shieldSprite,
		game: game
    });

    var weapon = that.weapon = WeaponBlock({
        spaceCraft: that,
        modulesManager: modulesManager,
        velocity: 400,
        spriteName: 'greenBeam',
		game: game
	});

    //===================================
    //============== PRIVATE ============
    //===================================

    function destroy(damageCraft)
    {
        var bonusType = generateBonus({
            health: 10,
            damage: 10,
            shield: 10
        });

        // Создание нового бонуса и занесение его в bonusArray
        utils.random() && sc.world.factory.createBonus({
            bonusType: bonusType,
            x: sprite.body.x,
            y: sprite.body.y,
            angle: game.rnd.angle()
        });

        sc.world.factory.createExplosion({
			x: that.sprite.x,
			y: that.sprite.y
		});

        damageCraft.statistic.addKillEnemy();

        isAlive = false;

        if (sc.scope.spaceCraft.getId() === that.getId())
        {
            statistic.calculateTotalScore();
            sc.scope.editorParams.isCodeRunning = false;
        }

        var modX = sc.world.getBounds().height - 320;
        var modY = sc.world.getBounds().width - 320;

        var nx = game.world.randomX % modX + 200;
        var ny = game.world.randomY % modY + 200;

        sprite.reset(nx, ny);

        protection.setHealth(protection.getMaxHealth());
        protection.setShield(protection.getMaxShield());
    }

    //===================================
    //============== THAT ===============
    //===================================

    that.update = function ()
    {
        weapon.update();
        protection.healthRegeneration();
        protection.shieldRegeneration();

        strategy && strategy({
			spaceCraft: that,
			game: game
		});
    };

    that.changeStatus = function ()
    {
        that.live = false;
    };

    that.isAlive = function ()
    {
        return isAlive;
    };

    that.hit = function (damage, damageCraft)
    {
        if(protection.getShield() > 0)
        {
            protection.subShield(damage);

            // если щит сломался, то в нем окажется отрицательное значение,
            // которое прибавлем к текущему здоровью
            if(protection.getShield() <= 0)
            {
                protection.subHealth(protection.getShield());
                protection.setShield(0);
            }
        }
        else
        {
            protection.subHealth(damage);
        }

        if (protection.getHealth() <= 0)
        {
            destroy(damageCraft);
        }
    };

    that.getX = function ()
    {
        return sprite.x;
    };

    that.getY = function ()
    {
        return sprite.y;
    };

    that.getAngle = function ()
    {
        return sprite.body.angle;
    };

    that.angleBetween = function (another)
    {
        var math = Phaser.Math;

        // Угол линии от точки к точке в пространстве.
        var a1 = math.angleBetween(sprite.x, sprite.y, another.getX(), another.getY()) + (Math.PI / 2);
        var a2 = math.degToRad(that.getAngle());

        a1 = math.normalizeAngle(a1);
        a2 = math.normalizeAngle(a2);

        a1 = math.radToDeg(a1);
        a2 = math.radToDeg(a2);

        var m1 = (360 - a1) + a2;
        var m2 = a1 - a2;

        if (m1 < m2)
        {
            return -m1;
        }
        else
        {
            return m2;
        }
    };

    that.distance = function (another)
    {
        var p = new Phaser.Point(another.getX(), another.getY());

        return Phaser.Point.distance(sprite, p);
    };

    // Переносим на верхний слой, перед лазерами.
    sprite.bringToTop();

    // Добавляем наш корабль в мир
    sc.world.pushObject(that);

    return that;
};
