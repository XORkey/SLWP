function KeyRing(filename)
{
	this.z = [];							// An array with hash-key combinations.
	this.filename = filename;				// The location on storage.
	this.HashHost =		function (host)
						{
							return require('data/sha256.js').SHA256(host);
						};
	this.DummyKey =		function (host)
						{					// Generate a random key for a new hash.
							var hash = this.HashHost(host);
							var rand = require('lib/random.js');
							var Kd = rand.uRandom32();
							if (this.z.GetKey(hash))
								Kd = null;	// This hash already exists!
							else			// Push a new set to the key ring.
								this.z.push([hash, Kd]);
							return Kd;
						};
	this.GetKey =		function (host)
						{
							if (host.length == 0)
								host = 'KeyRingID';
							var hash = this.HashHost(host);
							for (var i = 0; i < this.z.length; i++)
								if (this.z[i][0] == hash)
									return this.z[i][1] >>> 0;
							return null;
						};
	this.UpdateKey =	function (host, key)
						{
							var hash = this.HashHost(host);
							for (var i = 0; i < this.z.length; i++)
								if (this.z[i][0] == hash)
									this.z[i][1] = key >>> 0;
							this.WriteKeyRing();
						};
	this.ReadKeyRing =	function()
						{
							var key_ring_file = fileIO.open(this.filename, 'r');
							if (!key_ring_file.closed)
							{
								var key_ring = key_ring_file.read();
								var hash_and_key = key_ring.split("\n");
								for (var i = 0; i < hash_and_key.length; i++)
									if (hash_and_key[i].length > 0)
										this.z.push(hash_and_key[i].split("="));
								key_ring_file.close();
							}
						};
	this.WriteKeyRing =	function ()
						{
						//	var fileIO = require('sdk/io/file');
							if (fileIO.exists(this.filename))
								fileIO.rename(this.filename, this.filename + '.old');
							var key_ring_file = fileIO.open(this.filename, 'w');
							if (!key_ring_file.closed)
							{
								for (var i = 0; i < this.z.length; i++)
									key_ring_file.write(this.z[i][0] + '=' + this.z[i][1] + '\n');
								key_ring_file.close();
							}
							else
								alert("Could not write key ring file '" + this.filename + "'!");
						};
	this.InitKeyRing =	function ()
						{
							var hash = require('data/sha256.js');
							var rand = require('data/random.js');
							key_ring_file = fileIO.open(filename, 'w');
							key_ring_file.write(hash.SHA256('KeyRingID') + '=' + rand.uRandom32() + '\n');
							key_ring_file.close();
						};
	var fileIO = require('sdk/io/file');
	if (!fileIO.exists(filename))
		this.InitKeyRing();
	if (fileIO.exists(this.filename))
		this.ReadKeyRing();
}

var default_keyring_file = '/Users/timo/.keyring';
var Z = new KeyRing(default_keyring_file);

module.exports = Z;
