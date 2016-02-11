'use strict';

/**
 * Created by vladthelittleone on 12.11.15.
 */
var ProtectionBlock = function (spec)
{
    var that = {};

    //===================================
    //============== INIT ===============
    //===================================

	var game = spec.game;
    var shield, health;

    var maxHealth = health = spec.health;
    var maxShield = shield = spec.shield;

    var shieldSprite = game.make.sprite(0, 0, spec.spriteShield || 'shield');
    var sprite = spec.sprite;

    shieldSprite.anchor.x = 0.5;
    shieldSprite.anchor.y = 0.5;

    sprite.addChild(shieldSprite);

    var regenerationModule = that.regeneration = RegenerationModule({
        modulesManager: spec.modulesManager,
        values: [2, 4, 6, 8],
        energyPoints: 2
    });

    //===================================
    //============== PRIVATE ============
    //===================================

    function regeneration(maxValue, value)
    {
        var deltaTime = game.time.elapsed / 1000;
        var deltaRegen = regenerationModule.getRegeneration() * deltaTime;

        if((maxValue - value) > deltaRegen)
        {
            return (value + deltaRegen);
        }
        else
        {
            return maxValue;
        }
    }

    function initApi()
    {
        that.incRegen = regenerationModule.inc;
        that.decRegen = regenerationModule.dec;
        that.getRegenEnergy = regenerationModule.getEnergyPoints;
        that.getRegeneration = regenerationModule.getRegeneration;
        that.getRegenerationByPoints = regenerationModule.get;
    }

    //===================================
    //============== THAT ===============
    //===================================

    that.addHealth = function (add)
    {
        var a = Math.abs(add);

        health += a;
        maxHealth += a;
    };

    that.addShield = function (add)
    {
        var a = Math.abs(add);

        shield += a;
        maxShield += a;
    };

    that.healthRegeneration = function ()
    {
        health = regeneration(maxHealth, health);
    };

    that.shieldRegeneration = function()
    {
        if (health >= maxHealth)
        {
            shield = regeneration(maxShield, shield);

            if (shield > 0)
            {
                shieldSprite.visible = true;
            }
        }
    };

    that.getHealth = function ()
    {
        return Math.floor(health);
    };

    that.getShield = function ()
    {
        return Math.floor(shield);
    };

    that.subHealth = function (dec)
    {
        health -= Math.abs(dec);
    };

    that.setHealth = function (h)
    {
        health = Math.abs(h);
    };

    that.subShield = function (dec)
    {
        shield -= Math.abs(dec);

        if(shield <= 0)
        {
            shieldSprite.visible = false;
        }
    };

    that.setShield = function (s)
    {
        shield = Math.abs(s);
    };

    that.getMaxHealth = function ()
    {
        return maxHealth;
    };

    that.getMaxShield = function ()
    {
        return maxShield;
    };

    initApi();

    return that;
};
