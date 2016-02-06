'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 */

/**
 * @constructor
 */
var WorldApi = function (world, id)
{
    var api = {};

    function get(callback, func, api)
    {
        var a = [];

        func().forEach(function (e, i, arr)
        {
            var apiElement = api(e);
            a.push(apiElement);

            if (callback)
            {
                callback(apiElement, i, arr);
            }
        });

        return a;
    }

    api.getBounds = world.getBounds;

    api.getEnemies = function (callback)
    {
        var enemies = [];

        world.getSpaceCrafts(id).forEach(function (e, i, arr)
        {
            var apiElement = EnemyApi(e);
            enemies.push(apiElement);

            if (callback)
            {
                callback(apiElement, i, arr);
            }
        });

        return enemies;
    };

    // Получить массив бонусов
    api.getBonuses = function (callback)
    {
        return get(callback, world.getBonuses, BonusApi);
    };

    return api;
};

/**
 * @constructor
 */
var BonusApi = function (bonus)
{
    var api = {};

    api.getY = bonus.getY;
    api.getX = bonus.getX;
    api.getId = bonus.getId;
    api.getType = bonus.getBonusType;

    return api;
};

/**
 * @constructor
 */
var SpaceCraftApi = function (spaceCraft)
{
    var api = {};

    api.weapon = api.w = WeaponBlockApi(spaceCraft.weapon);
    api.engine = api.e = EngineBlockApi(spaceCraft.engine);
    api.protection = api.p = ProtectionBlockApi(spaceCraft.protection);

    api.getId = spaceCraft.getId;

    api.getHealth = api.p.getHealth;
    api.getShield = api.p.getShield;
    api.getRegeneration = api.p.getRegeneration;

    api.getX = spaceCraft.getX;
    api.getY = spaceCraft.getY;

    api.getAngle = spaceCraft.getAngle;
    api.angleBetween = spaceCraft.angleBetween;
    api.distance = spaceCraft.distance;

    api.rotateLeft = api.e.rotateLeft;
    api.rotateRight = api.e.rotateRight;
    api.rotateTo = api.e.rotateTo;
    api.moveForward = api.e.moveForward;
    api.moveBackward = api.e.moveBackward;
    api.moveTo = api.e.moveTo;
    api.moveToNearestBonus = api.e.moveToNearestBonus;

    api.inRange = api.w.inRange;
    api.fire = api.w.fire;
    api.enemiesInRange = api.w.enemiesInRange;
    api.fireNearestEnemy = api.w.fireNearestEnemy;

    api.getFreePoints = spaceCraft.modulesManager.getFreePoints;
    api.getMaxPoints = spaceCraft.modulesManager.getMaxPoints;

    api.moveTo = api.e.moveTo;
    api.moveToNearestBonus = api.e.moveToNearestBonus;

    api.getMoveSpeedByPoints = api.e.getMoveSpeedByPoints;
    api.getRegenByPoints = api.p.getRegenByPoints;
    api.getRangeByPoints = api.w.getRangeByPoints;
    api.getRateByPoints = api.w.getRateByPoints;
    api.getDamageByPoints = api.w.getDamageByPoints;

    return api;
};

/**
 * @constructor
 */
var EngineBlockApi = function (engine)
{
    var api = {};

    api.moveSpeed = ModuleApi(engine.moveSpeed);

    api.rotateLeft = engine.rotateLeft;
    api.rotateRight = engine.rotateRight;
    api.rotateTo = engine.rotateTo;
    api.moveForward = engine.moveForward;
    api.moveBackward = engine.moveBackward;
    api.moveTo = engine.moveTo;
    api.moveToNearestBonus = engine.moveToNearestBonus;

    api.incMoveSpeed = engine.incMoveSpeed;
    api.decMoveSpeed = engine.decMoveSpeed;
    api.getMoveSpeedEnergy = engine.getMoveSpeedEnergy;
    api.getMoveSpeed = engine.getMoveSpeed;
    api.getMoveSpeedByPoints = engine.getMoveSpeedByPoints;

    return api;
};

/**
 * @constructor
 */
var ProtectionBlockApi = function (protection)
{
    var api = {};

    api.regeneration = ModuleApi(protection.regeneration);

    api.getHealth = protection.getHealth;
    api.getShield = protection.getShield;

    api.incRegen = protection.incRegen;
    api.decRegen = protection.decRegen;
    api.getRegenEnergy = protection.getRegenEnergy;
    api.getRegeneration = protection.getRegeneration;
    api.getRegenByPoints = protection.getRegenByPoints;

    return api;
};

/**
 * @constructor
 */
var WeaponBlockApi = function (weapon)
{
    var api = {};

    api.rate = ModuleApi(weapon.rate);
    api.damage = ModuleApi(weapon.damage);
    api.range = ModuleApi(weapon.range);

    api.getDamage = weapon.getDamage;
    api.getFireRate = weapon.getFireRate;
    api.getFireRange = weapon.getFireRange;

    api.inRange = weapon.inRange;
    api.fire = weapon.fire;
    api.enemiesInRange = weapon.enemiesInRange;
    api.fireNearestEnemy = weapon.fireNearestEnemy;

    api.incDamage = weapon.incDamage;
    api.incRange = weapon.incRange;
    api.incRate = weapon.incRate;

    api.decRate = weapon.decRate;
    api.decRange = weapon.decRange;
    api.decDamage = weapon.decDamage;

    api.getRateEnergy = weapon.getRateEnergy;
    api.getRangeEnergy = weapon.getRangeEnergy;
    api.getDamageEnergy = weapon.getDamageEnergy;

    api.getRangeByPoints = weapon.getRangeByPoints;
    api.getRateByPoints = weapon.getRateByPoints;
    api.getDamageByPoints = weapon.getDamageByPoints;

    return api;
};

/**
 * @constructor
 */
var ModuleApi = function (module)
{
    var api = {};

    api.inc = module.inc;
    api.dec = module.dec;
    api.getEnergyPoints = module.getEnergyPoints;
    api.getMax = module.getMax;
    api.get = module.get;

    return api;
};

/**
 * @constructor
 */
var EnemyApi = function (spaceCraft)
{
    var api = {};

    api.weapon = EnemyWeaponApi(spaceCraft.weapon);
    api.getHealth = spaceCraft.protection.getHealth;
    api.getShield = spaceCraft.protection.getShield;
    api.getRegeneration = spaceCraft.protection.getRegeneration;
    api.getX = spaceCraft.getX;
    api.getY = spaceCraft.getY;
    api.getAngle = spaceCraft.getAngle;
    api.angleBetween = spaceCraft.angleBetween;
    api.distance = spaceCraft.distance;
    api.getId = spaceCraft.getId;

    return api;
};

/**
 * @constructor
 */
var EnemyWeaponApi = function (weapon)
{
    var api = {};

    api.getDamage = weapon.getDamage;
    api.getFireRate = weapon.getFireRate;
    api.getFireRange = weapon.getFireRange;

    return api;
};
