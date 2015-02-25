// Map a number
function map(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function constrain(value, f, t)	{
	if (value < f)	{
		return f;
	}
	if (value > t)	{
		return t;
	}
	else	{
		return value;
	}
}