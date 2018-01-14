<?php
    $major_release = 0;
    printf("\t\t<title>%s%d %s</title>\t\t<!-- %s -->\n", "XORkey", $major_release, $PageTitle, $_SERVER["PHP_SELF"]);
?>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta charset='utf-8'>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel='stylesheet' type='text/css' href='css/xorkey.css'>
        <link rel='stylesheet' type='text/css' href='css/webfonts/junction.css'>
        <link rel='stylesheet' type='text/css' href='css/webfonts/droid-sans.css'>
        <link rel='stylesheet' type='text/css' href='css/theme<?php echo $Theme; ?>.css'>
        <link rel='icon' href='img/icon/<?php echo $Icon ?>'>
        <noscript>
            <style>
                DIV#content { display: none; }
            </style>
        </noscript>
