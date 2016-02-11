var cat =
{
	sayMeow: function ()
	{
		return 'Мяу';
	},
	goToShop: function ()
	{
		return 'Иду в магазин';
	},
	sleep: function ()
	{
		return 'спит...';
	},
	beggingFood: function()
	{
		return this.sayMeow() + this.sayMeow();
	},
	calculateNumber : function (x, y)
	{
		return x + y;
	}
};

BBotDebug(cat.sayMeow());
BBotDebug(cat.goToShop());
BBotDebug(cat.sleep());
BBotDebug(cat.beggingFood());
BBotDebug(cat.calculateNumber(5 + 3));

