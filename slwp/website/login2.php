<?php
	session_start();
	$n=32;
	require 'user_pages.php';
	function getAccountInfo($Uh)
	{
		$_SESSION["s"] = 0;				// Normal login by default.
		$accounts = New mysqli('localhost', 'root', 'root','accounts');
		if ($accounts->connect_errno)
		{
			printf("Connect failed: %s\n", $accounts->connect_error);
			exit();
		}
		$Ks = 0;
		if ($result = $accounts->query("SELECT `Ks` FROM `sitekey` WHERE Uh = \"$Uh\""))
		{
			if ($result->num_rows)
				$Ks = $result->fetch_object()->Ks;
			$result->close();
		}
		$accounts->close();
		return $Ks;
	}
	$_SESSION["Ks"] = getAccountInfo($_POST["Uh"]);
	$_SESSION["Au"] = $_POST["Au"];
	$_SESSION["i"] = 0;
	echo "<!-- ".$_SESSION["Ks"]." ".$_SESSION["Au"]." -->";
	$Bs = $Qs = $Ps = 0;				// Global variables that HSM() operates on.
	if ($_SESSION["Ks"] != 0)
	{
		send_bs_ps($n);
	}
	else
	{
		$u = $_POST["Uh"];
		login_failed("No such user: $u");
	}
?>
