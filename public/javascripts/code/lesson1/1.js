// сделать что то там
function say (n, text) {
	var message = '';

	for (var i = 0; i < n; ++i) {
		message += text;
	}

	return message;
}
//
var cat = {
	sayMeow: function (n) {
		return say(n, ' Мяу ');
	},

	sleep: function () {
		return ' спит... ';
	}
};
// кошка
var dog = {
	sayWoof: function(n) {
		return say(n, ' Гав-гав ');
	},

	findBone : function() {
		return ' кость найдена '
	}
};

BBotDebug(dog.sayWoof(10));
BBotDebug(dog.findBone());

BBotDebug(cat.sayMeow(2 + 5));
BBotDebug(cat.sleep());

