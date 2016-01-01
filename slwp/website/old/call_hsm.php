<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<pre>
<?php
//	$shell_script = '/Applications/MAMP/htdocs/slwp/HSM.sh ' .
	$shell_script = 'ssh timor@joep ./HSM.sh ' .
					$_POST["Au"] . ' ' . $_POST["Ks"] . ' ' . $_POST["n"] . ' ' . $_POST["v"] . ' ' . $_POST["i"] . " 2>&1";
	$output = shell_exec($shell_script);
	echo "$output"
?>
		</pre>
	</body>
</html>
