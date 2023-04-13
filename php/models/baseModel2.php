<?php
require_once __DIR__ . "/../index.php";
class Base2 extends Utility {
    protected $query;
    protected $table;
    protected $sql;
    protected $stmt;
    protected $execParams;
    protected $tbl;
    protected $fields;
    protected $sqlFields;
    protected $affected_rows;
    protected $idField;
    protected $params;
    protected $addFields;
    protected $deleteSQL;
    
// initialize the new object.
    function __construct(){
        $this->execParams=(array)[];
        $this->affected_rows=0;
        $this->deleteSQL = "DELETE FROM $this->tbl WHERE id = ?";
    }

    public function placeholders(){
        $p = array();
        if (sizeof(array_keys($this->params[0]))>1){
        for ($i=0; $i<sizeof(array_keys($this->params[0])); $i++){
            $p[]='?';
        };
        return implode(',',$p);
        };
    }
    // standard function to return data from the DB.  Sends info to parent function.
    public function runQuery(){
        try{
            $this->stmt=CONN->PDOConn->prepare($this->sql);
            $this->stmt->execute($this->execParams);    
            $this->data = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
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
            $values=$this->placeholders();
            $addFields = implode(',', array_keys($this->params[0]));  
            $this->sql = "INSERT INTO $this->tbl ($addFields) VALUES ($values)";
            $this->stmt=CONN->PDOConn->prepare($this->sql);
            $newIDs = array();

            foreach($this->params as $item){
                $this->stmt->execute(array_values($item));
                $this->affected_rows = $this->affected_rows + $this->stmt->rowCount();
                $this->newIDs[] = CONN->PDOConn->lastInsertId();
            }
            // $this->addResponse('ID',$newIDs);
            $this->message = "{$this->affected_rows} record(s) sucessfully added";
        }
        catch( Exception $e){
            $this->errorOut($e->getMessage());
        };
    }
    
// standard DELETE function.  Sends info to parent function.
    public function deleteFrom($id){
        try{
        $this->stmt = CONN->PDOConn->prepare($this->deleteSQL);
        $this->stmt->execute([$id]);
        $this->affected_rows = $this->affected_rows + $this->stmt->rowCount();
        $this->message = "{$this->affected_rows} record(s) sucessfully deleted";
        } catch( Exception $e){
            $this->errorOut($e->getMessage());
        };
    }        
}
?>