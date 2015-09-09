package com.spacecraft.game.unit;

import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.MathUtils;
import com.badlogic.gdx.math.Vector2;
import com.spacecraft.game.GameManager;

/**
 * @author Makovchik Ivan
 * @since 14.06.15
 */
public class SpaceCraft implements Unit
{
    private final LaserWeapon laser = new LaserWeapon(100, 5, 4, "Bom bom Bitch");

    private final float SCALE = 1.0f;

    private final Sprite sprite = new Sprite(GameManager.spaceCraftTexture());

    // Новые координаты корабля
    private final Vector2 newPosition = new Vector2();

    // Расположения корабля
    private final Vector2 position = new Vector2();

    // Новое направление корабля
    private final Vector2 newDirection = new Vector2();

    // Направление
    private final Vector2 direction = new Vector2();

    // Скорость корабля
    private float velocity = 20f;

    // Скорость поворота
    private float rotationSpeed = 5f;

    public SpaceCraft(Vector2 position, Vector2 direction)
    {
        initialization(position.x, position.y, direction.x, direction.y);
    }

    public SpaceCraft(float x, float y)
    {
        initialization(x, y, 1, 0);
    }

    @Override
    public void moveTo(float x, float y)
    {
        newPosition.set(x, y);
        newDirection.set(newPosition).sub(position).nor();
    }

    @Override
    public void moveTo(Vector2 vector)
    {
        newPosition.set(vector);
        newDirection.set(vector).sub(position).nor();
    }

    @Override
    public void draw(SpriteBatch batch)
    {
        sprite.setPosition(position.x, position.y);
        sprite.setRotation(direction.angle() - 90);
        sprite.draw(batch);
    }

    @Override
    public void update(float delta)
    {
        float deltaVelocity = velocity * delta;

        // Если корабль не поварачивает, то меняем местоположение корабля.
        if (!rotateShip(delta))
        {
            if (!(position.equals(newPosition)))
            {
                changePosition(deltaVelocity);
            }
        }
    }

    /**
     * @param delta - дельта времени
     * @return true, если поворот сделан / false, если поворот не сделан
     */
    private boolean rotateShip(float delta)
    {
        // Векторное произведение. + против, - по часовой.
        float crs = direction.crs(newDirection);

        // Если корабль не повернул в нужном направление, то выполняем поворот.
        if (crs != 0)
        {
            // Проверка компланарности векторов (с помощью векторного произведение)
            if (crs > 0)
            {
                rotate(1, delta);
            }
            else
            {
                rotate(-1, delta);
            }

            return true;
        }

        return false;
    }

    private void rotate(float rotateDirection, float delta)
    {
        float d = newDirection.angle(direction);
        float s = rotationSpeed * delta;

        if (Math.abs(d) > s)
        {
            direction.rotate(rotateDirection * s).nor();
        }
        else
        {
            direction.set(newDirection);
        }
    }

    /**
     * Изменение текущих координат
     *
     * @param deltaVelocity длина пройденного пути с момента обновления последнего кадра
     */
    private void changePosition(float deltaVelocity)
    {
        if (velocity > newPosition.dst(position))
        {
            position.set(newPosition);
        }
        else
        {
            position.mulAdd(direction, deltaVelocity);
        }
    }

    private void initialization(float x, float y, float dx, float dy)
    {
        this.position.set(x, y);
        this.newPosition.set(x, y);

        this.direction.set(dx, dy);
        this.newDirection.set(dx, dy);

        // Поварачиваем на текстуру корабля на 90 градусов
        sprite.rotate(90);
        sprite.setScale(SCALE);
    }

    public Vector2 getPosition()
    {
        return position;
    }

    public float getVelocity()
    {
        return velocity;
    }
}
