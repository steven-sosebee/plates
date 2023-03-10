<?php

class Base {
    protected $db_host;
    protected $db_userName;
    protected $db_password;
    protected $db;
    protected $query;

    // initialize the new object.
    function __construct(){
        $this->_connect('box5934.bluehost.com:3306', 'steveqv1_root', 'walrus', 'steveqv1_cookbook');
        $this->values = '?';
        $this->response = (object)[];
    }
    // standard connectivity
    public function _connect($db_host,$db_userName,$db_password,$db){
        $this->db_host=$db_host;
        $this->db_userName=$db_userName;
        $this->db_password=$db_password;
        $this->db=$db;
        try{
            $this->connection=mysqli_connect($this->db_host, $this->db_userName, $this->db_password,$this->db);
        }
        catch( Exception $e){
            $this->res['error'] = $e->getMessage();            
        }
    }
    // close connection to DB.  TODO add more code for error monitoring.
    public function disconnect(){
        mysqli_close($this->connection);
    }
    // standard function to return data from the DB.  Sends info to parent function.
    public function runQuery(){
        try{
            return $this->connection->query($this->sql)->fetch_all(MYSQLI_ASSOC);
        }
        catch( Exception $e){
            $this->res['error'] = $e->getMessage();
        };
    }
    
    public function listAll(){
        $this->sql="SELECT $this->displayFields FROM $this->tbl";
        $this->res = $this->runQuery();
        $this->response();
    }
    // standard INSERT function.  Sends info to parent function.
    public function insertInto (){
        try{
            $this->sqlPrepare();
            $this->sql = "INSERT INTO $this->tbl ($this->fields) VALUES ($this->values)";
            $this->stmt=$this->connection->prepare($this->sql);
            $this->res['id'] =  mysqli_insert_id($this->connection);
        }
        catch( Exception $e){
            $this->res['error'] = $e->getMessage();
        };
    }
    // standard DELETE function.  Sends info to parent function.
    public function deleteId($params){
        $this->sql = "DELETE FROM $this->tbl WHERE $this->idField=?";
        try{
        $this->stmt = $this->connection->prepare($this->sql);
        $this->stmt->bind_param("i",$params['data']['id']);
        $this->stmt->execute();
        $this->res['affectedRows'] = $this->stmt->affected_rows;
        $this->res['info'] = "Record deleted...";
        } catch( Exception $e){
            $this->res['error'] = $e->getMessage();
        };
        $this->disconnect();
        $this->response();
    }

    public function sqlPrepare(){        
        for ($i=1; $i<sizeof($this->fields); $i++){
            $this->values = $this->values.',?';
        }
        $this->fields = implode(',',$this->fields);     
    }

    public function executeInsert(){
        $this->stmt->execute();
        $this->res['id'] =  mysqli_insert_id($this->connection);
        $this->res['affectedRows'] = $this->stmt->affected_rows;
    }

    public function classOutput(){
        $this->res['class'] = get_object_vars($this);
    }

    public function response(){
        echo json_encode($this->res);
        $this->disconnect();
    }
        
}
?>