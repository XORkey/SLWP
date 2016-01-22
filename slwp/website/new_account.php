<?php
	session_start();
	$n=32;
	$Kd = $_POST["Kd"];
	$Uh = $_POST["Uh"];
//	$shell_script = '/Applications/MAMP/htdocs/slwp/call_new_account.sh 0x' . dechex($Kd) . " " . $n;
	$shell_script = '/Applications/MAMP/htdocs/slwp/call_new_account.sh 0x' . strval($Kd) . " " . $n;
	$output = shell_exec($shell_script);
	list($Kx, $Ky) = explode(' ', trim($output));
	$accounts = New mysqli('localhost', 'root', 'root','accounts');
	if ($accounts->connect_errno)
	{
		printf("Connect failed: %s\n", $accounts->connect_error);
		exit();
	}
//	$Ks = hexdec($Ky);					// No encryption in this demo.
	$Ks = strval($Ky);
	$query = "INSERT INTO sitekey (Uh, Ks) VALUES ('$Uh', '$Ks')";
	if ($accounts->query($query))
	{
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<script src="keyring.js"></script>
		<title>Account created</title>
	</head>
	<body>
		<input id='Kx' name='Kx' type='password' value='<?php echo strval($Kx) ?>' hidden>
		<script>console.log(document.getElementById('Kx').value);</script>
		<form name='login' method='post' action='login2.php'>
			<input id='Uh' name='Uh' type='password' hidden>
			<input id='Au' name='Au' type='password' hidden>
		</form>
		<img src='XORkey icons RGB.png' width=100px>
		<h1>Account created!</h1>
		<p>	Please hit the login button again to login!</p>
	</body>
</html>
<?php
	}
	else								// Insert failed, no account created.
	{
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<title>Account creation FAILED</title>
	</head>
	<body>
		<img src="XORkey icons RGB.png" width=100px>
		<h1>Account creation FAILED</h1>
	</body>
</html>
<?php
		die('Error: ' . mysqli_error($accounts));
	}
	$accounts->close();
	return $Ks;
?>
