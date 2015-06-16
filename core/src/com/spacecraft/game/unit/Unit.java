package com.spacecraft.game.unit;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector2;


/**
 * Created by vaimer on 14.06.2015.
 */
public interface Unit
{
     /**
      * �������� ����� ���������� ��� ��������
      * @param x ����������  �� ��� �
      * @param y ���������� �� ��� �
      */
     void moveTo(float x, float y);

     /**
      * �������� ����� ���������� ��� ��������
      * @param vector ������ ���������
      */
     void moveTo(Vector2 vector);

     /**
      * ��������� ������� � ������� �����������
      * @param batch ������ ���������� �� ��������� ����� �� �����
      */
     void draw(SpriteBatch batch);

     /**
      * ���������� ��������� � ����������� �� ������� ���������� ���������� �����
      * @param delta ����� ���������� �����
      */
     void update(float delta);
}
