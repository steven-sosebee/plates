<?php

class Base2 {
    protected $db_host;
    protected $db_userName;
    protected $db_password;
    protected $db;
    protected $query;

    // initialize the new object.
    function __construct(){
        $this->response = (array)[];
        $this->_connect('box5934.bluehost.com:3306', 'steveqv1_root', 'walrus', 'steveqv1_cookbook');
        // $this->values = '?';
        
        $this->affected_rows=0;
    }
    // standard connectivity
    public function _connect($db_host,$db_userName,$db_password,$db){
        $this->db_host=$db_host;
        $this->db_userName=$db_userName;
        $this->db_password=$db_password;
        $this->db=$db;
        try{
            $this->connection=mysqli_connect($this->db_host, $this->db_userName, $this->db_password,$this->db);
            try{
            $this->PDOConn= new PDO("mysql:host=box5934.bluehost.com;port=3306;dbname=steveqv1_cookbook", $this->db_userName, $this->db_password,
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            $this->addResponse("connection",true);
            } catch (PDOException $e) {
                $this->addResponse('Connection failed',$e->getMessage());
            // $this->addResponse('PDO',$this->PDOConn->getAttribute("PDO::ATTR_SERVER_INFO"));
        }}
        catch( Exception $e){
            $this->errorOut($e->getMessage());
        }
    }
    // close connection to DB.  TODO add more code for error monitoring.
    public function disconnect(){
        mysqli_close($this->connection);
    }

    public function placeholders(){
        $p = array();
        if (sizeof(array_keys($this->items[0]))>1){
        for ($i=0; $i<sizeof(array_keys($this->items[0])); $i++){
            $p[]='?';
        };
        return implode(',',$p);
        };
    }
    // standard function to return data from the DB.  Sends info to parent function.
    public function runQuery(){
        try{
            // return $this->connection->query($this->sql)->fetch_all(MYSQLI_ASSOC);
            $this->stmt=$this->PDOConn->prepare('SELECT * FROM tblRecipes');
            $this->addResponse("stmt",$this->stmt);
            $this->stmt->execute();
            return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch( Exception $e){
            $this->addResponse('error', $e->getMessage());
        };
    }
    
    public function addResponse($field, $value){
        $this->response[$field]=$value;
    }

    // standard INSERT function.  Sends info to parent function.
    public function insertInto (){
        try{
            $this->values=$this->placeholders();
            $this->addFields = implode(',', array_keys($this->items[0]));  
            $this->sql = "INSERT INTO $this->tbl ($this->addFields) VALUES ($this->values)";
            // $this->res['SQL'] = $this->sql;
            $this->stmt=$this->connection->prepare($this->sql);
            $newIDs = array();

            foreach($this->items as $item){
                $this->stmt->execute(array_values($item));
                $this->affected_rows = $this->affected_rows + $this->stmt->affected_rows;
                $newIDs[] = mysqli_insert_id($this->connection);
            }
            $this->addResponse('ID',$newIDs);
            $this->addResponse('Message',"{$this->affected_rows} record(s) sucessfully added");
        }
        catch( Exception $e){
            $this->errorOut($e->getMessage());
        };
    }
    
    // standard DELETE function.  Sends info to parent function.
    public function deleteFrom(){
        $this->sql = "DELETE FROM $this->tbl WHERE id = ?";
        try{
        $this->stmt = $this->connection->prepare($this->sql);
        $this->stmt->execute([$this->id]);
        $this->affected_rows = $this->affected_rows + $this->stmt->affected_rows;
        $this->addResponse('Message',"{$this->affected_rows} record(s) sucessfully deleted");
        } catch( Exception $e){
            $this->errorOut($e->getMessage());
        };
    }

    public function errorOut($err){
        $this->addResponse('Error', $err);
    }

    public function response(){
        echo json_encode($this->response);
        $this->disconnect();
    }
        
}
?>