<?php
	session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Login 32-bit implementation</title>
		<meta charset="utf-8">
<!--		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js"></script> -->
		<script src="file:///Users/timo/src/slwp/website/sha256.js"></script>
		<script>
			function Random(bits)
			{
				return Math.floor(Math.random() * Math.pow(2, bits));
			}
			function loginStep1()
			{
				var Ru = Random(32);
				var Au = Ru ^ document.getElementById("Ku").value;
				document.getElementById("Au").valule = Au;
				sessionStorage.Au = Au;
				sessionStorage.Bu = sha256_digest(Ru) % 32;
			}
		</script>
	</head>
	<body>
		<input id=Ku type=text value="38374902"></input>
		<form id="login1" action="login2.html" onsubmit="loginStep1()">
			<input id=Uh type=text value="JoepieTralala" hidden></input>
			<input id=Au type=password hidden></input>
			<input type="submit" value="Login Step 1"></input>
		</form>
	</body>
</html>
