<?php
    // Prerequisite configurations.
    // require_once __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__."/config/config_defs.php";
    require_once __DIR__ . "/config/config.php"; 


    // 
    if ($_SERVER['REQUEST_URI']=="/php/user/"){
        $dbUser = new UserDBConnection();
    } else {
        // echo json_encode("not a valid request");
        // die();
    }
    if ($_SERVER['REQUEST_URI']=="/php/"){
        $db = new DBConnection();
    } else {
        echo json_encode("not a valid request");
        die();
    }

    try{
        $res = (new $model($params, $db))->{$action}();
        $db->disconnect();
        echo json_encode($res);
    } catch (Exception $err){
        $db->disconnect();
        echo json_encode($err);
    }

?>