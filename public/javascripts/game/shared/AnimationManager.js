/**
 * Created by Ivan on 18.12.2015.
 */

var AnimationManager = function(spec)
{
	var that = {};

	// Группа спрайтов которые нужно будет удолить
	var deadGroup = spec.game.add.group();

	that.explosion = function (spec)
	{
		// Создаем объект взрыва
		var boomSprite = new Explosion
		(
			{
				game: spec.game,
				x: 	spec.x,
				y:	spec.y,
				scale: spec.scale
			}
		);

		// Анимация, массив это то какие кадры использовать и в какой последовательности
		var anim = boomSprite.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

		anim.killOnComplete = true;

		// После выполнения анимации добавить спрайт в группу смертников
		anim.onComplete.add(function() {
			deadGroup.add(this);
		}, boomSprite);

		// Воспроизводим анимацию
		anim.play('boom');
	};

	// Функиция удоляет спраты взрывов
	that.update = function ()
	{
		deadGroup.forEach
		(
			function(sprite)
			{
				sprite.destroy();
			}
		);
	};

	return that;
};


