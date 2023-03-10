<?php
    require __DIR__ . "/config/config.php";
    // require MODELS_PATH."baseModel.php";
    // require MODELS_PATH."recipes.php";
    // require MODELS_PATH."ingredients.php";
    // require MODELS_PATH."recipes.php";

    $model["Recipe"]= new Recipe2;
    $model['Ingredient'] = new Ingredient;
    $model["Test"] = new Base;
    $model["Step"] = new Step;
    $model["Grocery"] = new Grocery;
    $model["ShoppingListItem"] = new ShoppingListItems;
    $model['ShoppingList'] = new ShoppingList;

    
    $model[$_SERVER['HTTP_CLASS']]->{$_SERVER['HTTP_ACTION']}($params);

?>