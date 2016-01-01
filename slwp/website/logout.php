<?php
	// Initialize the session.
	// If you are using session_name("something"), don't forget it now!
	session_start();

	// Unset all of the session variables.
	$_SESSION = array();

	// If it's desired to kill the session, also delete the session cookie.
	// Note: This will destroy the session, and not just the session data!
	if (ini_get("session.use_cookies")) {
		$params = session_get_cookie_params();
	    setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
	}
	// Finally, destroy the session.
	session_destroy();
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<title>Logged out</title>
	<head>
	<body>
		<img src="XORkey logo RGB.png" height=100px>
		<h1>You are logged out.</h1>
		<p>	<a href="login.html">Log back in</a></p>
		<p>	<a href="priv1.php">Try visit private page</a></p>
	</body>
</html>
