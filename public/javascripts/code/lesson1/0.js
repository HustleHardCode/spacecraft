// КОТЕЙКА, ВСЕМ КОТЕЕК
var cat = function() {
	var that = {};

	that.sayWoof = function() {
		return 'мяу-мяу'
	};

	that.sayWoof = function(n) {
		var msg = '';
		// не знаю почему 3 и 2 но по другому вроде не работает.
		for (var i = 3; i <= n + 2; ++i)
			msg += 'мяу-мяу';

		return msg;
	};

	that.sleep = function () {
		return 'спит...';
	};

	that.sl = function(a, b) {
		return a + b;
	};

	return that;
};

// Уточка
var dog = function() {
	var that = {};

	that.sayWoof = function() {
		return 'Гав-гав'
	};

	that.sayWoof = function(n) {
		var msg = '';
		// не знаю почему 3 и 2 но по другому вроде не работает.
		for (var i = 3; i <= n + 2; ++i)
			msg += 'гав-гав';

		return msg;
	};

	that.findBone = function() {
		return 'кость найдена'
	};

	return that;
};

var dog = dog();
BBotDebug(dog.sayWoof(10));
BBotDebug(dog.findBone());
var cat = cat();
BBotDebug(cat.sayWoof(cat.sl(2, 5)));
BBotDebug(cat.sleep());
