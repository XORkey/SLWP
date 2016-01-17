function Key(host)
{
	if (host.length == 0)
		return Z[0][1] >>> 0;
	else
	{
		var host_hash = require('lib/sha2.js').SHA256(host);
		for (var i = 0; i < Z.length; i++)
			if (Z[i][0] == host_hash)			// Found a host?
				return Z[i][1] >>> 0;
	}
	return null;
}

function KeyRing(filename)
{
	var z = [];
	var fileIO = require('sdk/io/file');
	var hash = require('lib/sha2.js');
	var rand = require('lib/random.js');
	if (!fileIO.exists(filename))
	{
		key_ring_file = fileIO.open(filename, 'w');
		key_ring_file.write(hash.SHA256('KeyRingID') + '=' + rand.uRandom32() + '\n');
		key_ring_file.close();
	}
	if (fileIO.exists(filename))
	{
		var key_ring_file = fileIO.open(filename, 'r');
		if (!key_ring_file.closed)
		{
			var key_ring = key_ring_file.read();
			var hash_and_key = key_ring.split("\n");
			for (var i = 0; i < hash_and_key.length; i++)
				if (hash_and_key[i].length > 0)
					z[i] = hash_and_key[i].split("=");
			key_ring_file.close();
		}
	}
	return z;
}

var Z = KeyRing('/Users/timo/.keyring');

exports.Key = Key;
