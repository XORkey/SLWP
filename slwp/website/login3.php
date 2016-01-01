<?php
	session_start();
	$n=32;
	require 'user_pages.php';
	if ($_POST["Qu"] == 1)				// User pressed 'cancel'.
		$_SESSION["Qs"] = $_POST["Qu"];	// Terminate loop at user's request.
	if ($_SESSION["s"] > 0)
		$_SESSION["i"] -= 1;
	else
		$_SESSION["i"] += 1;
	if ($_POST["Qu"] == $_SESSION["Qs"])// Do we have a match?
	{									// This is the end of the loop.
		$F = $_SESSION["Qs"];
		if ($F > 1 && $_SESSION["s"] > 0)
			$F = $_SESSION["Au"];		// Deny user a key update.
		if ($_POST["Qu"] > 1 && $F > 1)
		{								// Login succeeded!!!
			$_SESSION["login_ok"] = $F;
			login_succeeded("welcome.php");
		}
		else							// Login failed.
			login_failed("cancelled");
	}
	else
		send_bs_ps($n);					// Get new values.
?>
