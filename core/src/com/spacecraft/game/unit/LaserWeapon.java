package com.spacecraft.game.unit;

/**
 * Created by Ivan on 05.09.2015.
 */
public class LaserWeapon implements Weapon
{
    private int damage;

    private int fireRate;

    private int fireFrequency;

    private String name;

    public LaserWeapon(int damage, int fireRate, int fireFrequency, String name)
    {
        this.damage = damage;
        this.fireFrequency = fireFrequency;
        this.fireRate = fireRate;
        this.name = name;
    }

    @Override
    public int getDamage()
    {
        return damage;
    }

    @Override
    public int getFireRate()
    {
        return fireRate;
    }

    @Override
    public int getFireFrequency()
    {
        return fireFrequency;
    }

    @Override
    public String getName()
    {
        return name;
    }
}
