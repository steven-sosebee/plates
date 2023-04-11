<?php

    class DBConnection {

        function __construct(){
            $this->response = (array)[];
            $this->_connect();
            $this->connected = true;            
            // $this->addResponse('response',)
            // $this->response();

            // return $res;
        }

// standard connectivity
        public function _connect(){
            try{
                $this->PDOConn= new PDO(
                    "mysql:host=".DB_HOST.
                    ";port=".DB_PORT.
                    ";dbname=".DB
                    , DB_USER
                    , DB_PASSWORD,
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
                $this->addResponse("connection",true);
            } catch (PDOException $e) {
                $this->addResponse("connection",false);
                $this->addResponse('Connection failed',$e->getMessage());
            }
        }
            
// close connection to DB.  TODO add more code for error monitoring.
        public function disconnect(){
            $this->PDOConn = NULL;
        }

        public function addResponse($field, $value){
            $this->response[$field]=$value;
        }
        
        public function response(){
            echo json_encode($this->response);
            // $this->disconnect();
        }
    }
?>