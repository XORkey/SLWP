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
//	function Random($bits)
//	{
//		return mt_rand();				// Will give 32-bits random regardless of $bits.
//	}
//	function AES($v, $k)
//	{
//		return $v ^ $k;					// Secretly use XOR for this.
//	}
//	function SHA($s)
//	{
//		return intval("0x" . substr(hash('sha256', $s), -8), 0);
//	}
//	function _HSM($Au, $Ks, $i)
//	{
//		global $Bs, $Ps, $Qs;
//		static $S = array(0x4452ff1e, 0x0351cb58, 0x34fd12bc, 0x425c3f62, 0xffeeddcc, 0x12345678, 0xaaaabbbb, 0x00ff1111);
//		if ($i < count($S))
//		{
//			$Ku = AES($Ks, $S[$i]);
//			$Ru = $Au ^ $Ku;
//			$Bs = (int)SHA($Ru);
//			error_log("Au = " . $Au . "; Ku = " . $Ku . "; Ru = " . $Ru . "; Bs = " . $Bs);
//			if ($i > 0)
//				$Rs = AES($Ks, $S[0]);
//			else
//				$Rs = Random(32);
//			$Ps = $Rs ^ $Ku;
//			$Qs = $Rs ^ $Ru;
//		}
//		else
//			$Bs = $Qs = $Ps = 0;
//		$Ku = $Ru = $Rs = 0;			// Forget all temporary values.
//	}
?>
