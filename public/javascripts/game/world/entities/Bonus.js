'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * Класс бонусов выпадающих после
 * Уничтожения корабля
 * @constructor
 */
var Bonus = function (spec)
{
	var game = spec.game;
	var sc = game.sc;

    var that = sc.world.factory.createGameObject({
        type: game.sc.world.bonusType
    });

    var x = that.x = spec.x;
    var y = that.y = spec.y;
    var bonusType = spec.bonusType;
    var rotateDirection = utils.randomOf(-1, 1);

    // Добавляем спрайт бонуса
    var sprite = that.sprite = game.add.sprite(x, y, bonusType.spriteName);
    sprite.name = that.getId();

    // Подключаем физику тел к бонусу
    game.physics.p2.enable(sprite);

    // Поварачиваем бонус на init-угол
    !spec.angle || (sprite.body.angle = spec.angle);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.setTo(0.65);
    sprite.checkWorldBounds = true;

    // Устанавливаем маленькую массу,
    // что б при столкновении с бонусом
    // кораблик не взаимодействовал с ней.
    sprite.body.mass = 0.00001;

    // Устанавливаем группу колизий
    sprite.body.setCollisionGroup(sc.collisionGroups.bonus);

    var bonusTake = function (bonus, spaceCraft)
    {
        if (bonus.sprite)
        {
            var s = sc.world.getSpaceCraft(spaceCraft.sprite.name);

            bonusType.useBonus(s);

            // Удаляем бонус
            sc.world.removeObject(that);

            bonus.sprite.destroy();
            bonus.destroy();

            s.statistic.addBonus();
        }
    };

    that.getX = function()
    {
        return sprite.x;
    };

    that.getY = function()
    {
        return sprite.y;
    };

    that.getBonusType = function()
    {
        return bonusType.name;
    };

    that.update = function ()
    {
        // Произошла коллизия бонуса с кораблем
        sprite.body.collides(sc.collisionGroups.spaceCraft, bonusTake, this);
        sprite.body.rotateLeft(rotateDirection);
        sprite.body.moveForward(1);
    };

    sc.world.pushObject(that);

    return that;
};

var HealthBonus = function (spec)
{
    var that = {};
    var health = spec.health;

    that.spriteName = 'bonus2';
    that.name = "health";

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.protection.addHealth(health);
    };

    return that;
};

var DamageBonus = function (spec)
{
    var that = {};
    var damage = spec.damage;

    that.spriteName = 'bonus1';
    that.name = 'damage';

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.weapon.addDamage(damage);
    };

    return that;
};

var ShieldBonus = function (spec)
{
    var that = {};
    var shield = spec.shield;

    that.spriteName = 'bonus3';
    that.name = 'shield';

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.protection.addShield(shield);
    };

    return that;
};

var generateBonus = function (spec)
{
    var bonus = utils.randomInt(1, 3);

    switch (bonus)
    {
        case 1: return HealthBonus({health: spec.health});
        case 2: return DamageBonus({damage: spec.damage});
        case 3: return ShieldBonus({shield: spec.shield});
    }
};
