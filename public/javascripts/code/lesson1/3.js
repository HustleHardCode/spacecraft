// Возведение x в степень y
var x = 5;
var y = 10;
var degree = 1;

for (var i = 0; i < y; ++i)
{
	degree *= x;
}

BBotDebug(degree);

// Нахождение масимального числа из двух
BBotDebug(Math.max(x, y));

// Нахождение минимального числа
var min;

if (x > y)
{
	min = y;
}
else
{
	min = x;
}

BBotDebug(min);


