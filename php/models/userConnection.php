<?php
    class UserDBConnection {

        function __construct(){
            $this->_connect();
            $this->connected = true;
            $this->params= $params;
        }

// standard connectivity
        public function _connect(){
            try{
                $this->connection= new PDO(
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
            $this->connection = NULL;
        }

        public function getSubscription($user){
            try{
                $params = $this->params;
                $sql = "SELECT endpoint, auth, p256dh FROM tblPushSubscriptions WHERE userId = ?";
                $stmt=$this->connection->prepare($sql);
                $stmt->execute([$user]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);    
                } catch(Exception $err){
                    return $err;
                    die();
                }
        }
        public function addSubscription ($user, $endpoint, $auth, $p256dh) {
            try{
            $sql = "INSERT INTO tblPushSubscriptions (userId, endpoint, auth, p256dh) VALUES (?,?,?,?)";
            $stmt=$this->connection->prepare($sql);
            $stmt->execute([$user, $endpoint, $auth, $p256dh]);
            if ($stmt->rowCount()>0){
                return "Subscription successfully created...";
            }
            return "Failed to create subscription";
            } catch(Exception $err){
                echo json_encode($err);
            }
            
        }
    }
?>