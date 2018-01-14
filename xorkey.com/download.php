<?php

$file = "downloads/" . $_GET['filename'];

if (file_exists($file))
{
	header("Expires: 0");
	header("Pragma: public");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	header("Content-Description: File Transfer");
	header("Content-Disposition: attachment; filename=" . basename($file));
	header("Content-Transfer-Encoding: binary");
	header("Content-Type: binary/octet-stream");
	ob_clean();
	flush();
	readfile($file);
}

?>
