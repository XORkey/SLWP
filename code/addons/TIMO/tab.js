function colored_border(pixels, color)
{
	if (document.body)
		document.body.style.border = pixels + 'px solid ' + color;
}

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
//								alert('Sorry, this website does not seem to be TIMO™ enabled yet.');
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

function handleMessage(request, sender, sendResponse)
{
	console.log(request);
	if (request.action == 'get_state')
	{
		console.log('Checking if enabled...');
		if (document.getElementById('Uh') && document.getElementById('Au'))
		{
			browser.runtime.sendMessage({state: 'havekey', host: window.top.location.host});
			return Promise.resolve({state: 'havekey', host: window.top.location.host});
		}
		else
		{
			console.log('...no. Bummer.');
			return Promise.resolve({state: 'disabled'});
		}
	}
}


browser.runtime.onMessage.addListener(handleMessage);

var tab_state = 'unknown';
if (document.getElementById('Uh') && document.getElementById('Au'))
{
	tab_state = 'enabled';
	// colored_border(3, 'orange');
	window.document.body.class = 'slwp_enabled';
}
else
	tab_state = 'disabled';

browser.runtime.sendMessage({host: window.top.location.host, state: tab_state});
