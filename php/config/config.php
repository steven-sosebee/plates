<?php

    define("PROJECT_ROOT_PATH", __DIR__ . "/../../");
    define("MODELS_PATH", __DIR__."/../models/");
    $config = parse_ini_file(__DIR__.'/../../private/config.ini');
    define("DB",$config['db']);
    define("DB_HOST",$config['db_host']);
    define("DB_USER",$config['db_userName']);
    define("DB_PASSWORD",$config['db_password']);
    define("DB_PORT",$config['port']);
    
    require MODELS_PATH."utility.php";
    require MODELS_PATH."connection.php";
    require MODELS_PATH."baseModel.php";
    require MODELS_PATH."baseModel2.php";
    require MODELS_PATH."recipes.php";
    require MODELS_PATH."recipes2.php";
    require MODELS_PATH."ingredients2.php";
    require MODELS_PATH."steps2.php";
    require MODELS_PATH."groceries.php";
    require MODELS_PATH."groceries2.php";
    require MODELS_PATH."shoppingListItems.php";
    require MODELS_PATH."shoppingLists.php";
    
    $params= json_decode(file_get_contents("php://input"),true);
    $model = $_SERVER['HTTP_CLASS'];
    $action = $_SERVER['HTTP_ACTION'];

?>