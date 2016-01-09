function AskToContinue(attempt)
{
	var c = true;
	if (attempt == 2)
		c = confirm("No match yet. Continue with this key?");
	return c == true ? 0 : 1;
}


self.port.on('login',	function() {
							if (window.location.protocol == 'http:' ||
								window.location.protocol == 'https:' ||
								window.location.protocol == 'file:')
										// Only allow safe channels.
							{
								//StartLogin(window.top.location.host);
										// Start a login for the host and port
										//                              combination.
								if (typeof window.crypto.getRandomValues === "function")
								{		// We're running a browser with a good PRG.
									var array = new Uint32Array(10);
									window.crypto.getRandomValues(array);
									var Ru = array[6];
								}
								else	// No good native PRG available.
								{		// Generate a 32-bit random with XORshift.
									var random = Xorshift03().uint32;
									var Ru = random();
								}
								sessionStorage.Ru = Ru >>> 0;
								self.port.emit('getUhAu', window.top.location.host, Ru);
							}
							else
								alert('Will not log you in over an unencrypted line.');
						});
self.port.on('UhAu',	function (Uh, Au) {
	console.log('Uh: ' + Uh + '; Au: ' + Au);
							document.forms['login']['Uh'].value = Uh;
							document.forms['login']['Au'].value = Au >>> 0;
							sessionStorage.Bu = parseInt(SHA256(sessionStorage.Ru).substr(-8), 16) >>> 0;
							console.log('Bu: ' + sessionStorage.Bu);
							sessionStorage.j = Number(0);
							document.getElementById('keys').innerHTML = sessionStorage.Ru + ' ' + sessionStorage.Bu;
							document.forms['login'].action = 'login2.php'
							document.forms['login'].submit();
						});
self.port.on('step2',	function () {
	console.log('Performing login calculations...');
							var Bs = document.getElementById('Bs');
							var Ps = document.getElementById('Ps');
							if (Bs && Ps)
							{
								console.log('Bs: ' + Bs.value + '; Ps: ' + Ps.value + '; now getting Rs...');
								self.port.emit('getRs', window.top.location.host, Ps.value);
							}
							else
							{
								console.log('Waiting for a login page with Bs and Ps.');
							}
						});
self.port.on('Rs',		function(Rs) {
	console.log('Rs: ' + Rs);
							sessionStorage.Rs = Rs >>> 0;
							var Bs = parseInt(document.getElementById('Bs').value, 16) >>> 0;
	console.log('Bs: ' + Bs);
							if (Bs == sessionStorage.Bu)
								document.forms['login_step']['Qu'].value = (Rs ^ (Number(sessionStorage.Ru) >>> 0)) >>> 0;
							else
								document.forms['login_step']['Qu'].value = AskToContinue(sessionStorage.j);
							sessionStorage.j = Number(sessionStorage.j) + 1;
							document.forms['login_step'].submit();
						});
