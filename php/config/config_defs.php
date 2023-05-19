<?php
    define("PROJECT_ROOT_PATH", __DIR__ . "/../../");
    define("MODELS_PATH", __DIR__."/../models/");
    $config = parse_ini_file(__DIR__.'/../../private/config.ini');
    define("DB",$config['db']);
    define("DB_HOST",$config['db_host']);
    define("DB_USER",$config['db_userName']);
    define("DB_PASSWORD",$config['db_password']);
    define("DB_PORT",$config['port']);
    define("EMAIL_HOST",$config['email_host']);
    define("EMAIL_FROM",$config['email_from']);
    define("EMAIL_PASSWORD",$config['email_password']);
    define("EMAIL_PORT", $config['email_port']);
    define("USERDB", $config['userDB']);
    define("PUBLIC_KEY",$config['push_PublicKey']);
    define("PRIVATE_KEY",$config['push_PrivateKey']);
    define("SUB", $config['push_sub']);
?>
