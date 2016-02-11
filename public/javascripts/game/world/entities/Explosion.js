/**
 * Created by vladthelittleone on 10.11.15.
 * @constructor
 */
var Explosion = function (spec)
{
	var game = spec.game;
	var x = spec.x;
	var y = spec.y;
	var scale = spec.scale;

    var boomSprite = game.add.sprite(x, y, 'explosion');

    if (scale)
    {
        boomSprite.scale.setTo(scale);
    }

    boomSprite.anchor.x = 0.5;
    boomSprite.anchor.y = 0.5;

	return boomSprite;
};
