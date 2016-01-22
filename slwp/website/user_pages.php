<?php
	function TIMO($Au, $Ks, $n, $v, $i)
	{
		global $Bs, $Ps, $Qs;
		$shell_script = '/Applications/MAMP/htdocs/slwp/call_hsm.sh 0x' . $Au . " 0x" . $Ks . " " . $n . " " . $v . " " . $i;
		$output = shell_exec($shell_script);
//		echo "<!-- TIMO: ".$output."-->".PHP_EOL;
		list($Bs, $Ps, $Qs) = explode(',', trim($output));
//		echo "Bs = " . $Bs . " Ps = " . $Ps . " Qs = " . $Qs . PHP_EOL;
	}
	function login_succeeded($ref)
	{
		global $F;
		?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<script src="keyring.js"></script>
		<title>Login successful</title>
	</head>
	<body>
		<img src="XORkey icons RGB.png" width=100px>
		<h1>LOGIN SUCCESS!!!</h1>
		<a href="<?php echo $ref ?>">Go to the welcome page</a>
		<a href="logout.php">Logout</a>
		<input type='text' id='logout_url' value='logout.php' hidden>
		<script>
			<?php
			if ($F != $_SESSION["Au"])
				echo "if (sessionStorage.j > 1)\n	UpdateKeyring(sessionStorage.Rs, sessionStorage.k);\n";
			else
				echo "document.write(\"Key update denied.\");\n";
			?>
		</script>
	</body>
</html>
		<?php
	}
	function login_failed($reason)
	{
		?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<title>Login FAILED</title>
	</head>
	<body>
		<img src="XORkey icons RGB.png" width=100px>
		<h1>Login FAILED (<?php echo $reason ?>)</h1>
		<p>Combination of userid and key number did not yield valid login credentials.</p>
			<a href="login.html">Try again...</a>
	</body>
</html>
		<?php
	}
	function send_bs_ps($n)
	{
		global $Qs, $Bs, $Ps;
		TIMO(sprintf("%08x", $_SESSION["Au"]), sprintf("%08x", $_SESSION["Ks"]), $n, 0, $_SESSION["i"]);
		if ($Qs != 0)					// Found something to test.
		{
			$_SESSION["Qs"] = $Qs;      // Save Qs.
		?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<title>Login step</title>
	</head>
	<body>
		<input type='text' id='Bs' name='Bs' value='<?php echo $Bs ?>' hidden>
		<input type='text' id='Ps' name='Ps' value='<?php echo $Ps ?>' hidden>
		<form name='login_step' method='post' action='login3.php'>
			<input type='text' id='Qu' name='Qu' hidden>
		</form>
	</body>
</html>
<?php
		}
		else							// No more keys to try.  End of the line.
		{
			login_failed("No more server keys");
		}
	}
?>
