package com.spacecraft.game.unit;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.math.Vector2;


/**
 * Created by vaimer on 14.06.2015.
 */
public class SpaceCraft implements Unit
{

    private static final SpriteBatch batch = new SpriteBatch();
    private Texture texture;
    private TextureRegion region;

    // ������� ���������� �������
    private float positionX;
    private float positionY;

    //����� ���������� �������
    private float newPositionX = 0;
    private float newPositionY = 0;

    //������� ���������� �������(��� ������)
    private float delta = 0.1f;

    //�������� �������
    private float velocity;

    /*���� �� ����� ��� � ��� ����� ������ � ������( � �� ����� � ������� ���������� �����
    � ����� ���������, ��� � ������ ��� ��� ��� �������, ������� ������ ���� ���, �����
    ���� ���� ��� ������, �������� �������� �� ������ �������� ��������� ���������� �� ���� ���������
     */
    public SpaceCraft(String file,float velocity)
    {
        this.texture = new Texture(Gdx.files.internal(file));
        positionX = 0;
        positionY = 0;
        region = new TextureRegion(texture, 20, 20, 50, 50);
        this.velocity = velocity * delta;
        draw(batch);
    }

    /*��������� ���������� �� ��� ��� ���� �� ���������� � ������ � ������������ ����������
    ������� , ���� ��� ����� ����� ������� ������� �� ����, �������� ������ ��� ���� ����� ����, ������
    �� ������� ���� ��-�� ��,  � ����������� ���� ��������� , � ��� � �������� ����� ������
    ������ ��� � �� ������
    */
    @Override
    public void moveTo(float x, float y)
    {
        newPositionX = x;
        newPositionY = y;
        while((positionX <= newPositionX) && (positionY <= newPositionY))
        {
            if(positionX != newPositionX)
                positionX += velocity;
            if (positionY != newPositionY)
                positionY += velocity;
            draw(batch);
        }
    }

    //�� ���� ��� ������������� ���� � ������ �������� �� ����������
    @Override
    public void moveTo(Vector2 vector)
    {

    }

    @Override
    public void draw(SpriteBatch batch)
    {
        batch.draw(region,positionX,positionY);
    }
}
