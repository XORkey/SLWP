function Hex32(n)
{
	var prefix = ""; 
	for (var j = 7; j > 0; j--)
		if (n >> (j * 4) == 0)
			prefix += "0";
	return prefix + n.toString(16);
}
function uRandom32()
{
	if (typeof window !== 'undefined' && typeof window.crypto.getRandomValues === 'function')
	{									// We're running a browser with a good PRG.
		var array = new Uint32Array(10);
		window.crypto.getRandomValues(array);
		return array[6];				// Randomly choose one of the elements :-).
	}
	else								// No good native PRG available.
	{									// Generate a 32-bit random with XORshift.
		var random = require('data/XORshift.js').Xorshift03().uint32;
		return random();
	}
}
