/*
** FILE:		slwptab.js
** DESCRIPTION:	JavaScript that is injected in every web page.
**				This script determines if the page contains the Uh and Au elements used for the SLWP protocol.
**				It reports this status to the main script in the browser.
** AUTHOR:		ing. T.M.C. Ruiter
** COPYRIGHT(c) 2019-2020 by XORkey B.V.
*/
'use strict';

function slwp_enabled()	{ return document.getElementById('Hu') && document.getElementById('Au'); }

function getstate()		{ return slwp_enabled() ? 'enabled' : 'missing'; }

function handleBrowserMessage(request, sender, sendResponse)
{
	switch (request.action)
	{
	case 'get_state':
		console.log('Checking if enabled...');
		var tab_state = getstate();
		switch (tab_state)
		{
		case 'enabled':
			browser.runtime.sendMessage({state: tab_state, host: window.top.location.host});
			return Promise.resolve({state: tab_state, host: window.top.location.host});
		default:
			console.log('...no. Bummer.');
			return Promise.resolve({state: 'disabled', host: window.top.location.host});
		}
		break;
	case 'set_state':
		window.document.body.classList.remove('enabled');
		window.document.body.classList.add(request.state);
		break;
	}
}

/* Register handleBrowserMessage() to act on messages from the main script. */
browser.runtime.onMessage.addListener(handleBrowserMessage);

var initial_tab_state = getstate();
window.document.body.classList.add(initial_tab_state);		// Activate the injected CSS.

var tabid = 0;
browser.runtime.sendMessage(
		{
			greeting: "Hello browser, this is " + window.top.location.host + "!",
			tab_state: initial_tab_state,
			host: window.top.location.host
		})
	.then(message => { console.log("Response: " + message.response); tabid = message.tabid; })
	.catch(e => console.log("sendMessage error: " + e))
	.finally(() => console.log("Script tabslwp.js loaded on tab[" + tabid + "]: initial_tab_state: " + initial_tab_state));

/*
runtime.onMessage('state',	function(color) {
							colored_border(20, color);
						});
runtime.onMessage('enabled',	function() {
							console.log('Checking if enabled...');
							if (document.getElementById('Uh') && document.getElementById('Au'))
							{
								runtime.sendMessage('havekey', window.top.location.host);
							}
							else
							{
								console.log('...no. Bummer.');
//								alert('Sorry, this website does not seem to be SLWP™ enabled yet.');
							}
						});
runtime.onMessage('haveKx',	function()
						{
							var Kx = document.getElementById('Kx');
							if (Kx)
								runtime.sendMessage('created', window.top.location.host, Kx.value);
						});
runtime.onMessage('get_logout_url',	function() {
									console.log('Checking for a logout URL...');
									var logout_url = document.getElementById('logout_url');
									if (logout_url)
									{
										runtime.sendMessage('success', logout_url.value);
										console.log('...found one!');
									}
									else
									{
										runtime.sendMessage('failure');
										console.log('no luck yet...');
									}
								});
*/
