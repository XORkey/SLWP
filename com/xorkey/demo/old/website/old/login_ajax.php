<?php
	session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Login 32-bit implementation</title>
		<meta charset="utf-8">
<!--		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js"></script> -->
		<script src="http://localhost:8888/sha256.js"></script>
		<script>
			function Random(bits)
			{
				return Math.floor(Math.random() * Math.pow(2, bits));
			}
			function loginStep1()
			{
				var Ru = Random(32);
				var Au = Ru ^ document.getElementById("Ku").value;
				document.getElementById("Au").value = Au;
				sessionStorage.Bu = Number("0x" + sha256_digest(String(Ru)).substr(-8));
			}
		</script>
	</head>
	<body>
		<input id=Ku type=text value="38374902"></input>
		<script>
			var xmlhttp;
			if (window.XMLHttpRequest)
				xmlhttp = new XMLHttpRequest();
			else
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			xmlhttp.open("POST", "login_ajax2.php", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send("fname=Henry&lname=Ford");
		</script>
		<form id="login1" method="post" action="login2.php" onsubmit="loginStep1()">
			<input id=Uh name=Uh type=text value="JoepieTralala" hidden></input>
			<input id=Au name=Au type=password value="uninitialized" hidden></input>
			<input type="submit" value="Login Step 1"></input>
		</form>
	</body>
</html>
