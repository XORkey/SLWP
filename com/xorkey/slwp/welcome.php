<?php
	session_start();
	if (!isset($_SESSION["login_ok"]))
		header("location:login.html");
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>Secret content</title>
		<meta charset="utf-8">
		<script>
			sessionStorage.Au = 0;
			sessionStorage.Bu = 0;
			sessionStorage.Rs = 0;
			sessionStorage.j = 0;
		</script>
	</head>
	<body>
		<img src="XORkey logo RGB.png" height=100px>
		<h1>Welcome to XORkey!</h1>
		<a href=priv1.php>priv1</a>
		<a href=priv2.php>priv2</a>
	</body>
</html>
