self.port.on('logout',	function(logout_url) {
							self.port.emit('loggedout');
							document.location.href = logout_url;
						});
