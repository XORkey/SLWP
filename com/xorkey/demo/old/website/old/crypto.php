<?php
	function Random($bits)
	{
		return mt_rand();				// Will give 32-bits random regardless of $bits.
	}
	function AES($v, $k)
	{
		return $v ^ $k;					// Secretly use XOR for this.
	}
	function SHA($s)
	{
		return intval("0x" . substr(hash('sha256', $s), -8), 0);
	}
?>
