<?php

class Base {
    protected $db_host;
    protected $db_userName;
    protected $db_password;
    protected $db;
    protected $query;
    function __construct(){
        $this->_connect('box5934.bluehost.com:3306', 'steveqv1_root', 'walrus', 'steveqv1_cookbook');
    }

    public function _connect($db_host,$db_userName,$db_password,$db){
        $this->db_host=$db_host;
        $this->db_userName=$db_userName;
        $this->db_password=$db_password;
        $this->db=$db;

        $this->connection=mysqli_connect($this->db_host, $this->db_userName, $this->db_password,$this->db);
    }

    public function disconnect(){
        mysqli_close($this->connection);
    }

    public function runQuery(){
        return $this->connection->query($this->sql)->fetch_all(MYSQLI_ASSOC);
        // $this->query = mysqli_query($this->sql,$this->connection);
        // return $this->query->fetch_all(MYSQLI_ASSOC);
    }

    public function test(){
        $res = "success";
        echo json_encode($res);
    }

    private function bindParams(){
        
    }
}
?>