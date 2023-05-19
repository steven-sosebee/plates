<?php
    class UserDBConnection {

        function __construct($params){
            $this->response = (array)[];
            $this->_connect();
            $this->connected = true;          
            $this->params= $params;
        }

// standard connectivity
        public function _connect(){
            try{
                $this->Conn= new PDO(
                    "mysql:host=".DB_HOST.
                    ";port=".DB_PORT.
                    ";dbname=".USERDB
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
            $this->Conn = NULL;
        }

        public function addResponse($field, $value){
            $this->response[$field]=$value;
        }
        
        public function response(){
            echo json_encode($this->response);
            // $this->disconnect();
        }

        public function getSubscription(){
            try{
                $params = $this->params;
                $this->sql = "SELECT endpoint, auth, p256dh FROM tblPushSubscriptions WHERE userId = ?";

                $this->stmt=$this->Conn->prepare($this->sql);
                $this->stmt->execute([$this->params['user']]);
                return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    
                } catch(Exception $err){
                    echo json_encode($err);
                    die();
                }
        }
        public function addSubscription () {
            try{
            $params = $this->params;
            $this->sql = "INSERT INTO tblPushSubscriptions (userId,endpoint, auth, p256dh) VALUES (?,?,?,?)";
            $this->stmt=$this->Conn->prepare($this->sql);
            $this->stmt->execute([$params['user'],$params['endpoint'], $params['auth'], $params['p256dh']]);
            echo json_encode("success");

            } catch(Exception $err){
                echo json_encode($err);
            }
            
        }
    }
?>