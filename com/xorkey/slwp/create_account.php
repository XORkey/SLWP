<?php
	session_start();
	$n=32;
	$Kd = $_POST["Kd"];
	$Uh = $_POST["Uh"];
	$shell_script = '/Applications/MAMP/htdocs/slwp/call_new_account.sh 0x' . dechex($Kd) . " " . $n;
	$output = shell_exec($shell_script);
	list($Kx, $Ky) = explode(',', trim($output));
	$accounts = New mysqli('localhost', 'root', 'root','accounts');
	if ($accounts->connect_errno)
	{
		printf("Connect failed: %s\n", $accounts->connect_error);
		exit();
	}
	$Ks = hexdec($Ky);							// No encryption in this demo.
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
		<input id='Ks' type='text' value='<?php echo $Kx ?>' hidden>
		<img src="XORkey icons RGB.png" width='100px'>
		<h1>Account created!</h1>
		<p>	Hit the login button again to login!</p>
	</body>
</html>
<?php
	}
	else
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
