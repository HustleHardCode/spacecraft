function check(value, mod)
{
	return value % mod == 0;
}

function calculateNumber(x, y)
{
	return x + y;
}

function sumMinMax(a, b, c, d)
{
	return Math.min(a, b, c, d) + Math.max(a, b, c, d);
}

function inc(x)
{
	return x + 1;
}

// кол-во нечетных элементов в массиве
array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var s = 0;
array.forEach(function(value) {
	if (check(value, 2))
	{
		s = inc(s);
	}
});

BBotDebug(s);
