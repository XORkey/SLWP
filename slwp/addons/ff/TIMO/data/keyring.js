function KeyRing(filename)
{
	this.z = [];							// An array with hash-key combinations.
	this.filename = filename;				// The location on storage.
	this.HashHost =	function (host)
					{
						return require('data/sha256.js').SHA256(host);
					};
	this.DummyKey =	function (host)
					{						// Generate a random key for a new hash.
						var rand = require('data/random.js');
						var Kd = rand.uRandom32();
						if (this.GetKey(host))
							Kd = null;		// This hash already exists!
						else				// Push a new set to the key ring.
							this.Update(host, Kd)
						return Kd;
					};
	this.GetKey =	function (host)
					{
						if (host.length == 0)
							host = 'KeyRingID';
						var hash = this.HashHost(host);
						for (var i = 0; i < this.z.length; i++)
							if (this.z[i][0] == hash)
								return this.z[i][1] >>> 0;
						return null;
					};
	this.Update =	function (host, key)
					{
						var hash = this.HashHost(host);
						for (var i = 0; i < this.z.length; i++)
							if (this.z[i][0] == hash)
							{
								this.z[i][1] = key >>> 0;
								console.log('Key updated.');
								break;
							}
						if (i == this.z.length)
						{
							console.log('Adding new key.');
							this.z.push([hash, key >>> 0]);
						}
						else
						this.Write();
					};
	this.Read =		function()
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
						console.log('Read \'' + this.filename + '\' with ' + this.z.length + ' keys.');
					};
	this.Write =	function ()
					{
						console.log('Trying to update \'' + this.filename + '\' with ' + this.z.length + ' keys.');
						var key_ring_file = fileIO.open(this.filename, 'w');
						if (!key_ring_file.closed)
						{
							for (var i = 0; i < this.z.length; i++)
							{
								var key = this.z[i][1] >>> 0;
								var hex_key = ("0000000" + ((key | 0) + 4294967296).toString(16)).substr(-8);
								key_ring_file.write(this.z[i][0] + '=0x' + hex_key + '\n');
							}
							key_ring_file.close();
						}
						else
						{
							console.log("Could not write key ring file '" + this.filename + "'!");
							alert("Could not write key ring file '" + this.filename + "'!");
						}
					};
	this.Init =		function ()
					{
						var hash = require('data/sha256.js');
						var rand = require('data/random.js');
						key_ring_file = fileIO.open(filename, 'w');
						if (!key_ring_file.closed)
						{
							console.log('Creating a new keyring.');
							var hex_rand = ("0000000" + ((rand.uRandom32() | 0) + 4294967296).toString(16)).substr(-8);
							key_ring_file.write(hash.SHA256('KeyRingID') + '=0x' + hex_rand + '\n');
							key_ring_file.close();
						}
						else
						{
							console.log('Cannot open key ring file ' + this.filename);
							alert('Cannot open key ring file ' + this.filename);
						}
					};
	var fileIO = require('sdk/io/file');
	if (!fileIO.exists(filename))
		this.Init();
	if (fileIO.exists(this.filename))
		this.Read();
}

var default_keyring_file = '/Users/timo/.keyring';
var Z = new KeyRing(default_keyring_file);

module.exports = Z;
