'use strict';

var UserId = String("Joepietralala");       // The UserID is fixed in this demo.
var keyring = require('data/keyring.js');

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

function Hex32(n)
{
    var prefix = ""; 
    for (var j = 7; j > 0; j--)
        if (n >> (j * 4) == 0)
            prefix += "0";
    return prefix + n.toString(16);
}
function Uh(KeyRingID, UID, host)
{
	var H0 = hash.SHA256(String(KeyRingID));		// 256 bits represented in 64 bytes.
	var H1 = hash.SHA256(UID + host);			// Another 256 bit value represented as a
											//                          64 bytes string.
	var Uh = "";
	for (var i = 0; i < 8; i++)				// For each 8 bytes of H0 and H1: XOR both
											//       and add the result as string to Uh.
		Uh += Hex32((parseInt(H0.substr(i * 8, 8), 16) ^ (parseInt(H1.substr(i * 8, 8), 16))) >>> 0);
	return Uh;								// Also a 256 bit value represented as a 64
											//                             bytes string.
}
function Au(Ru, host)
{
	return (Ru ^ keyring.GetKey(host)) >>> 0;
}
function Rs(Ps, host)
{
	return (Ps ^ keyring.GetKey(host)) >>> 0;
}

var data = require('sdk/self').data;
var buttons = require('sdk/ui/button/action');
var hash = require('data/sha256.js');
var tabs = require('sdk/tabs');

var state = 'unknown';
var logout_url;

tabs.on('ready', loginStep);
tabs.on('close', logout);


function loginStep(tab) {
 	var worker = tab.attach({
 		contentScriptFile: [data.url('checks.js'),
							data.url('login.js')]
 	});
	console.log('New worker on this tab. state: ' + state);
	switch (state) {
	case 'unknown':
		worker.port.emit('enabled', 'green');
		worker.port.on('havekey',	function(host) {
										console.log('Checking for a key for URL: ' + host);
										if (keyring.GetKey(host) != null)
										{
											console.log('State: havekey.');
											worker.port.emit('state', 'green');
											state = 'havekey';
										}
										else
										{
											console.log('State: enabled.');
											worker.port.emit('state', 'blue');
											state = 'enabled';
										}
									});
		break;
	case 'enabled':
		console.log('Sorry, we cannot continue... No key available.');
		break;
	case 'havekey':
		console.log('starting step2...');
		worker.port.emit('step2');
		worker.port.on('getRs',		function(url_host, Ps) {
										console.log('url: ' + url_host + '; Ps: ' + Ps);
										worker.port.emit('Rs', Rs(Ps, url_host));
										state = 'step2';
									});
		break;
	case 'step2':
		worker.port.emit('get_logout_url');
		worker.port.on('success',	function(url) {
										console.log('Found URL for logout: ' + url + '; State: loggedin.');
										logout_url = url;
										state = 'loggedin';
									});
		break;
	}
}

function logout(tab) {
	console.log('Logging out...');
	var worker = tab.attach({ contentScriptFile: data.url('logout.js') });
	worker.port.emit('logout', logout_url);
	worker.port.on('loggedout',	function () {
									console.log('Logged out. State: unknown.');
									state = 'unknown';
								});
}

function doLogin()
{
	switch (state) {
	case 'loggedin':
		console.log('Logging out by user request.');
		logout(tabs.activeTab);
		break;
	case 'havekey':
		var worker = tabs.activeTab.attach({
			contentScriptFile: [data.url('sha256.js'),
								data.url('XORshift.js'),
								data.url('random.js'),
								data.url('login.js')]
		});
		worker.port.emit('login');
		worker.port.on('getUhAu',	function(url_host, Ru) {
										console.log('url: ' + url_host + '; Ru: ' + Ru);
										worker.port.emit('UhAu', Uh(keyring.GetKey(''), UserId, url_host), Au(Ru, url_host));
									});
		break;
	default:
		console.log('State: ' + state + '; no action.');
		break;
	}
}

var button = buttons.ActionButton({
  id: 'TIMO-Login',
  label: 'TIMO Login',
  icon: {
    '16': './XORkey-16.png',
    '32': './XORkey-32.png',
    '64': './XORkey-64.png'
  },
  onClick: doLogin
});
