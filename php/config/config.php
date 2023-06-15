<?php

    // Cookbook database models
    require MODELS_PATH."utility.php";
    require MODELS_PATH."connection.php";
    require MODELS_PATH."baseModel.php";
    require MODELS_PATH."recipes.php";
    require MODELS_PATH."ingredients.php";
    require MODELS_PATH."steps.php";
    require MODELS_PATH."groceries.php";
    require MODELS_PATH."shoppingListItems.php";
    require MODELS_PATH."shoppingLists.php";

    // Push notification models
    require MODELS_PATH."userConnection.php";

    $params= json_decode(file_get_contents("php://input"),true);
    $model = $_SERVER['HTTP_CLASS'];
    $action = $_SERVER['HTTP_ACTION'];

?>