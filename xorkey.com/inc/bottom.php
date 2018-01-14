<?php
$StartYear=2017;
$Version = 0.3;
?>
            <div id='siteinfo'>
                <div class='cmdbversion'>
                    <p>v<?php echo $Version ?></p>
                </div>
                <div class='centered'>
                    <p class='copyright'>Copyright &copy; <?php echo $StartYear; if (date('Y') > $StartYear) printf("-%s", date('Y')); ?> by XORkey B.V.<br>Winterkoning 5, 1722 CA<br>ZUID-SCHARWOUDE<br>The Netherlands</p>
                </div>
                <div class='right'>
                    <table class='quicklinks'>
                    <tr><td>Quick links</td></tr>
                    </table>
                </div>
            </div>  <!-- #siteinfo -->
