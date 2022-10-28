<?php

    define("PROJECT_ROOT_PATH", __DIR__ . "/../../");
    define("MODELS_PATH", __DIR__."/../models/");
    require MODELS_PATH."baseModel.php";
    require MODELS_PATH."recipes.php";
    require MODELS_PATH."ingredients.php";
    // require MODELS_PATH."recipes.php";

    $params= json_decode(file_get_contents("php://input"),true);
    
// include the base controller file
// require_once PROJECT_ROOT_PATH . "/php/Controller/Api/BaseController.php";
 
// include the use model file
// require_once PROJECT_ROOT_PATH . "/php/Model/user.php";


// define("JWT_KEY","asdlkjeijghgpwoen0304928484h9492");
?>