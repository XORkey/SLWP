function Hex32(n)
{
    var prefix = ""; 
    for (var j = 7; j > 0; j--)
        if (n >> (j * 4) == 0)
            prefix += "0";
    return prefix + n.toString(16);
}
self.port.on('get_url',			function()
								{
									console.log('giving url');
									self.port.emit('url_host', window.top.location.host);
								});
self.port.on('create_account',	function (Uh, Kd)
								{
									console.log('Trying to create an account. Uh: ' + Uh + '; Kd: ' + Hex32(Kd >>> 0));
									document.forms['new_account']['Uh'].value = Uh;
									document.forms['new_account']['Kd'].value = Hex32(Kd >>> 0);
									document.forms['new_account'].submit();
								});
