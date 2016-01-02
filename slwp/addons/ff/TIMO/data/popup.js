function displayUh(uid, keyringid)
{
	var Uh = document.getElementById('UhDisplay');
	Uh.innerHTML = "UID: " + uid + " KeyringID: " + keyringid;
}

function p(color)
{
		document.body.style.border = '25px solid ' + color;
}

if (document.getElementById('Uh'))
	if (document.body)
		p('red')
