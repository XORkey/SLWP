<?php
	function SLWP($Au, $Ks, $n, $v, $i)
	{
		global $Bs, $Ps, $Qs;
		$shell_script = '/Applications/MAMP/htdocs/slwp/call_hsm.sh ' . $Au . " " . $Ks . " " . $n . " " . $v . " " . $i;
		$output = shell_exec($shell_script);
		echo "<!-- SLWP: ".$output."-->".PHP_EOL;
		list($Bs, $Ps, $Qs) = explode(',', trim($output));
		echo "Bs = " . $Bs . " Ps = " . $Ps . " Qs = " . $Qs . PHP_EOL;
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
		SLWP(sprintf("%08x", $_SESSION["Au"]), sprintf("%08x", $_SESSION["Ks"]), $n, 0, $_SESSION["i"]);
		if ($Qs != 0)					// Found something to test.
		{
			$_SESSION["Qs"] = $Qs;      // Save Qs.
		?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<script src="sha256.js"></script>
		<script src="keyring.js"></script>
		<title>Login step</title>
		<script>
			function LoginStep()
			{
				var Rs = XorKu(<?php echo $Ps ?>, sessionStorage.k) >>> 0;
				sessionStorage.Rs = Rs >>> 0;
				if (<?php echo $Bs ?> == sessionStorage.Bu)
				{
					document.getElementById("Qu").value = (Rs ^ (Number(sessionStorage.Ru) >>> 0)) >>> 0;
				}
				else
					document.getElementById("Qu").value = AskToContinue(sessionStorage.j);
				sessionStorage.j = Number(sessionStorage.j) + 1;
				document.login_step.submit();
			}
		</script>
	</head>
	<body onload=LoginStep()>
		<form name="login_step" method=post action=login3.php>
			<input type=text id=Qu name=Qu hidden>
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
