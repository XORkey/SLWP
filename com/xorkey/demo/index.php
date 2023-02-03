<!DOCTYPE html>
<html>
	<head>
<?php include "head.php"; ?>
		<script>
			function onLoad() {
				console.log("index.php loaded.");
			}
		</script>
	</head>
	<body onload='window.onLoad()'>
		<h1>SLWP demo</h1>
		<h2>Powered by XORkey <img src='/img/logo/xorkeylogo.png' alt='XORkey logo'</h2>
		<form>
			<input type='text' id='Au' name='Au'>
			<input type='text' id='Hu' name='Hu'>
		</form>
	</body>
</html>
