<?php
    require __DIR__ . "/config/config.php";
    
    if ($_SERVER['REQUEST_URI']=="/php/"){
        $db = new DBConnection();
        define("CONN",$db);
    } else {
        echo json_encode("not a valid request");
        die();
    }

    // (new Base2())->testing($_SERVER['HTTP_CLASS'], $_SERVER['HTTP_ACTION'],$params);
    try{
    $res = (new $model($params))->{$action}();
    $db->disconnect();
    echo json_encode($res);
    } catch(Exception $err){
        $db->disconnect();
        echo json_encode($err);
    }
    
    
    
    
        // echo json_encode($db);
        // $res = $db->g;
        // $res = $db->PDOConn->query("SELECT * FROM tblGroceries")->fetchAll();
    
    // $model["Recipe"]= new Recipe2;
    // $model['Ingredient'] = new Ingredient;
    // $model["Test"] = new Base;
    // $model["Step"] = new Step;
    // $model["Grocery"] = new Grocery;
    // $model["ShoppingListItem"] = new ShoppingListItems;
    // $model['ShoppingList'] = new ShoppingList;
    
    // $model[$_SERVER['HTTP_CLASS']]->{$_SERVER['HTTP_ACTION']}($params);

?>