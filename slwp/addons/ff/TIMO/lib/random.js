var XORshift = require('lib/XORshift.js');

function uRandom32()
{
	// Not sure how to access the browser's random function.
//	if (typeof window.crypto.getRandomValues === "function")
//	{									// We're running a browser with a good PRG.
//		var array = new Uint32Array(10);
//		window.crypto.getRandomValues(array);
//		return array[6];				// Randomly choose one of the elements :-).
//	}
//	else								// No good native PRG available.
//	{									// Generate a 32-bit random with XORshift.
		var random = XORshift.Xorshift03().uint32;
		return random();
//	}
}

exports.uRandom32 = uRandom32;
