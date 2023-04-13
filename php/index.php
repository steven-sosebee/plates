<?php
    require __DIR__ . "/config/config.php";
    
    if ($_SERVER['REQUEST_URI']=="/php/"){
        $db = new DBConnection();
        define("CONN",$db);
    } else {
        echo json_encode("not a valid request");
        die();
    }

    try{
    $res = (new $model($params))->{$action}();
    $db->disconnect();
    echo json_encode($res);
    } catch(Exception $err){
        $db->disconnect();
        echo json_encode($err);
    }

?>