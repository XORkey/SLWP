/*
** FILE:		timo.js
** DESCRIPTION:	Code that runs centrally in the browser, co-ordinating logins.
**				It needs to talk to all the tabs, and also with a external program
**				providing login keys.
** AUTHOR:		ing. T.M.C. Ruiter
** COPYRIGHT(c) 2019-2020 by XORkey B.V.
*/
'use strict';

var UserId = String("Joepietralala");       // The UserID is fixed in this demo.

/*
** Hex32():
**	Represent a value as a 32bit hexadecimal string, prepended with zeroes.
*/
function Hex32(n)
{
    var prefix = ""; 
    for (var j = 7; j > 0; j--)
        if (n >> (j * 4) == 0)
            prefix += "0";
    return prefix + n.toString(16);
}

/*
** Hu():
**	Construct an Hu value.
*/
function Hu(KeyRingID, UID, host)
{
	var H0 = hash.SHA256(String(KeyRingID));
										// 256 bits represented in 64 bytes.
	var H1 = hash.SHA256(UID + host);	// Another 256 bit value represented as a 64
										//                                 bytes string.
	var Hu = "";
	for (var i = 0; i < 8; i++)			// For each 8 bytes of H0 and H1: XOR both and
										//               add the result as string to Hu.
		Hu += Hex32((parseInt(H0.substr(i * 8, 8), 16) ^ (parseInt(H1.substr(i * 8, 8), 16))) >>> 0);
	return Hu;							// Also a 256 bit value represented as a 64
										//                                 bytes string.
}
function Au(Ru, host)
{
	return (Ru >>> 0 ^ keyring.GetKey(host)) >>> 0;
}
function Rs(Ps, host)
{
	return (Ps >>> 0 ^ keyring.GetKey(host)) >>> 0;
}

/*
var logout_url;

tabs.on('ready', loginStep);
tabs.on('close', logout);


function loginStep(tab) {
//	console.log(tab.url);
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
	case 'creating':
		console.log('checking if account is made...');
		worker.port.emit('haveKx');
		worker.port.on('created',	function(url_host, Kx)
									{
										var Kd = keyring.GetKey(url_host);
										var Ku = ((parseInt('0x' + Kx) >>> 0) ^ Kd) >>> 0;
										keyring.Update(url_host, Ku);
										console.log('account is created');
										state = 'havekey';
									});
		break;
	case 'havekey':
		console.log('starting step2...');
		worker.port.emit('step2');
		worker.port.on('getRs',		function(url_host, Ps)
									{
										worker.port.emit('Rs', Rs(Ps, url_host));
										state = 'step2';
									});
		break;
	case 'step2':
		worker.port.emit('get_logout_url');
		worker.port.on('failure',	function()
									{
										worker.port.emit('step2');
									});
		worker.port.on('getRs',		function(url_host, Ps)
									{
										worker.port.emit('Rs', Rs(Ps, url_host));
										state = 'step2';
									});
		worker.port.on('success',	function(url)
									{
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
	case 'enabled':
		var worker = tabs.activeTab.attach({
			contentScriptFile:	data.url('new_account.js')
		});
		worker.port.emit('get_url');
		worker.port.on('url_host', function(url_host)
									{
										state = 'creating';
										worker.port.emit('create_account',
															Hu(keyring.GetKey(''), UserId, url_host),
															keyring.DummyKey(url_host));
									});
		worker.port.on('created', function() { state = 'havekey'; });
		break;
	case 'havekey':
		var worker = tabs.activeTab.attach({
			contentScriptFile: [data.url('sha256.js'),
								data.url('XORshift.js'),
								data.url('random.js'),
								data.url('login.js')]
		});
		worker.port.emit('login');
		worker.port.on('getHuAu',	function(url_host, Ru) {
										worker.port.emit('HuAu', Hu(keyring.GetKey(''), UserId, url_host), Au(Ru, url_host));
									});
		break;
	default:
		console.log('State: ' + state + '; no action.');
		break;
	}
}
*/

/*------------------------------*/

var tab_states = [];						// Remember the state for each tab.
											// Tab State is an Object:
											//	{	host:	window.top.location.host (host part of the URL),
											//		state:	one of
											//				{	'unknown': we have no clue,
											//					'missing': we see no Hu or Au anywhere,
											//					'enabled': we have found Hu and Au on the page,
											//					'havekey': we have found a key for 'host',
											//					'failure': we have not been able to log in.
											//					'wearein': we have successfully logged in.
											//				}
											//	}
											// A web page may offer a user to login on any page,
											// but must not do so once the user is logged in.
											// Instead, it may indicate to the application that
											// login was successful, or it may keep quiet about it.

//
// Tab Finite State Machine:
//
// U -> M on Au and Hu missing.
// U,M -> E on Au and Hu found on tab
// U,M -> H on Au and Hu found on tab and we have a key.
//
/* Do something when the login button is pressed. */
function doLogin(tab)
{
	console.log("doLogin(" + tab.id + ")");
	if (tab_states[tab.id] == undefined)
		browser.tabs.sendMessage(tab.id, {action: 'get_state'})
			.catch(e => console.log('Failed: ' + e));
	else
	{
		var state = tab_states[tab.id].state;
		var host = tab_states[tab.id].host;
		switch (state)
		{
		case "enabled":
			if (keyring.GetKey(host) != null)
			{
				tab_states[tab.id].state = 'havekey';
				browser.tabs.sendMessage(tab.id, {action: 'set_state', state: 'havekey'});
			}
			else
				console.log('We have no key for host ' + host);
			break;
		case "missing":
		default:
			console.log('State: ' + state + '; no action.');
			break;
		}
	}
}

function handleTabMessage(message, sender, sendResponse)
{
	console.log(message.greeting);
	// Each tab calls in for every page it serves.
	// Give it some CSS to work with.
	browser.tabs.insertCSS(sender.tab.id, { file: "content.css" })
		.then( null, e => console.log(`SLWP Error: ${e}`));
	tab_states[sender.tab.id] = { host: message.host, state: message.tab_state };
	if (tab_states[sender.tab.id].state == "missing")
	{
		browser.browserAction.disable(sender.tab.id);
		browser.browserAction.setTitle({tabId: sender.tab.id, title: "TIMO is disabled on this tab."});
	}
	else
	{
		browser.browserAction.enable(sender.tab.id);
		browser.browserAction.setTitle({tabId: sender.tab.id, title: "TIMO is ENABLED on this tab."});
	}
	sendResponse({response: "Hi there from handleTabMessage()!", tabid: sender.tab.id });
}

/*
**	SETUP
*/
var keyring = new KeyRing();
browser.browserAction.onClicked.addListener(doLogin);
										// Start the login process when the browser button is clicked.
browser.runtime.onMessage.addListener(handleTabMessage);
										// React to messages from tabs.
