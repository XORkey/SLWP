function colored_border(pixels, color)
{
	if (document.body)
		document.body.style.border = pixels + 'px solid ' + color;
}

self.port.on('state',	function(color) {
							colored_border(20, color);
						});
self.port.on('enabled',	function(color) {
							console.log('Checking if enabled...');
							if (document.getElementById('Uh') && document.getElementById('Au'))
							{
								self.port.emit('havekey', window.top.location.host);
							}
							else
							{
								console.log('...no. Bummer.');
//								alert('Sorry, this website does not seem to be TIMO™ enabled yet.');
							}
						});
self.port.on('haveKx',	function()
						{
							var Kx = document.getElementById('Kx');
							if (Kx)
								self.port.emit('created', window.top.location.host, Kx.value);
						});
self.port.on('get_logout_url',	function() {
									console.log('Checking for a logout URL...');
									var logout_url = document.getElementById('logout_url');
									if (logout_url)
									{
										self.port.emit('success', logout_url.value);
										console.log('...found one!');
									}
									else
									{
										self.port.emit('failure');
										console.log('no luck yet...');
									}
								});
