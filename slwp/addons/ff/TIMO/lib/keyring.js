function Key(host)
{
	var host_hash = require('lib/sha2.js').SHA256(host);
	for (var i = 0; i < Z.length; i++)
		if (Z[i][0] == host_hash)			// Found a host?
			return Z[i][1];					// Return the key.
	return null;
}

function KeyRing(file)
{
	var z = [];
	var fileIO = require('sdk/io/file');
	var key_ring_file = fileIO.open(file, 'r');
	if (key_ring_file.closed)
	{
		key_ring_file = fileIO.open(file, 'w');
											// Create empty key ring file.
	}
	else
	{
		var key_ring = key_ring_file.read();
		var hash_and_key = key_ring.split("\n");
		for (var i = 0; i < hash_and_key.length; i++)
			if (hash_and_key[i].length > 0)
				z[i] = hash_and_key[i].split("=");
	}
	key_ring_file.close();
	return z;
}

var Z = KeyRing('/Users/timo/.keyring');

exports.Key = Key;
