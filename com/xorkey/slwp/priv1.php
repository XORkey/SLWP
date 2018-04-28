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
	</head>
	<body>
		<img src="XORkey logo RGB.png" height=100px>
		<h1>This is private file 1</h1>
		<a href=priv2.php>priv2</a>
		<a href=logout.php>Logout</a>
	</body>
</html>
