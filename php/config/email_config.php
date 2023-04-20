<?php
$config = parse_ini_file(__DIR__.'/../../private/config.ini');
define("EMAIL_HOST",$config['email_host']);
define("EMAIL_FROM",$config['email_from']);
define("EMAIL_PASSWORD",$config['email_password']);
define("EMAIL_PORT", $config['email_port']);
?>
