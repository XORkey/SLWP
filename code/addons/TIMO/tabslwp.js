/*
** FILE:		slwptab.js
** DESCRIPTION:	JavaScript that is injected in every web page.
**				This script determines if the page contains the Uh and Au elements used for the SLWP protocol.
**				It reports this status to the main script in the browser.
** AUTHOR:		ing. T.M.C. Ruiter
** COPYRIGHT(c) 2019 by XORkey B.V.
*/
'use strict';

function slwp_enabled()
{
	return document.getElementById('Uh') && document.getElementById('Au');
}

function getstate()
{
	if (slwp_enabled())
	{
		return 'slwp_enabled';
	}
	else
		return 'slwp_disabled';
}

function handleBrowserMessage(request, sender, sendResponse)
{
	console.log(request);
	if (request.action == 'get_state')
	{
		console.log('Checking if enabled...');
		var tab_state = getstate();
		switch (tab_state)
		{
		case 'slwp_enabled':
			browser.runtime.sendMessage({state: tab_state, host: window.top.location.host});
			return Promise.resolve({state: tab_state, host: window.top.location.host});
		default:
			console.log('...no. Bummer.');
			return Promise.resolve({state: 'disabled', host: window.top.location.host});
		}
	}
}

/* Register handleBrowserMessage() to act on messages from the main script. */
browser.runtime.onMessage.addListener(handleBrowserMessage);

var tab_state = getstate();
window.document.body.className = tab_state;

browser.runtime.sendMessage({state: tab_state, host: window.top.location.host});

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
