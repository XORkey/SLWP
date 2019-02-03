/*
**	Injected script. Runs in page.
*/
'use strict';

function isLoginPage()
{
	return document.getElementById('Uh') && document.getElementById('Au');
}
function canApplyForNewAccount()
{
	return document.forms['new_account'] && document.forms['new_account']['Uh'] && document.forms['new_account']['Kd'];
}
function coloredBorder(pixels, color)
{
	if (document.body)
		document.body.style.border = pixels + 'px solid ' + color;
}
function getMessage(event)
{
	console.log(event.name);
    switch (event.name) {
	case 'nokey':
		slwp_state = event.name;
		coloredBorder(20, 'blue');
		break;
	case 'havekey':
		slwp_state = event.name;
		coloredBorder(20, 'green');
		break;
	case 'buttonPressed':
		switch (slwp_state) {
		case 'nokey':
			if (canApplyForNewAccount())
			{
				console.log('Trying to create an account. Uh: ' + Uh + '; Kd: ' + Hex32(Kd >>> 0));
				document.forms['new_account']['Uh'].value = Uh;
				document.forms['new_account']['Kd'].value = Hex32(Kd >>> 0);
				document.forms['new_account'].submit();
			}
			else
				console.log('This is not a place to apply for a new account!');
			break;
		case 'havekey':
			console.log('We can login...');
			break;
		default:
			console.log('We cannot do much when we are in state "' + slwp_state + '".');
			break;
		}
		break;
	}
}

safari.self.addEventListener("message", getMessage, false);

var slwp_state = 'init';

console.log('Checking if enabled...');
if (isLoginPage())
	safari.self.tab.dispatchMessage('dowehavekey', window.top.location.host);
else
	console.log('...no. Bummer.');



//self.port.on('haveKx',	function()
//						{
//							var Kx = document.getElementById('Kx');
//							if (Kx)
//								self.port.emit('created', window.top.location.host, Kx.value);
//						});
//self.port.on('get_logout_url',	function() {
//									console.log('Checking for a logout URL...');
//									var logout_url = document.getElementById('logout_url');
//									if (logout_url)
//									{
//										self.port.emit('success', logout_url.value);
//										console.log('...found one!');
//									}
//									else
//									{
//										self.port.emit('failure');
//										console.log('no luck yet...');
//									}
//								});
