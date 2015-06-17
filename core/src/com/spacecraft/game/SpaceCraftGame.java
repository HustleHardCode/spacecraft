package com.spacecraft.game;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.graphics.FPSLogger;
import com.spacecraft.game.screens.MainWindowScreen;

public class SpaceCraftGame extends Game
{
    private FPSLogger fps;

    @Override
    public void create()
    {
        // Создание всех игровых сервисов, объектов.
        fps = new FPSLogger();

        setScreen(new MainWindowScreen());
    }

    @Override
    public void render()
    {
        super.render();
        fps.log();
    }
}