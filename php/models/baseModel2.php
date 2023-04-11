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

// initialize the new object.
    function __construct(){
        // $this->response = (array)[];
        $this->execParams=(array)[];
        // $this->params=$params;
        // $this->values = '?';
        $this->affected_rows=0;
        
        // $this->testing();

    }
    // function __destruct(){
    //     return $this->response;
    // }
    // function testing ($class,$action) {
    //     $this->params = $params;
    //     $this->model = new $class;
    //     $this->data = $class;
    //     $this->action = $action;
    //     $this->addResponse('data',($this->model));
    //     $this->addResponse('params',$this->params);
    //     $this->model->{$action}();
    //     $this->response();

    // }

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
        $this->stmt = CONN->PDOConn->prepare($this->sql);
        $this->stmt->execute([$this->id]);
        $this->affected_rows = $this->affected_rows + $this->stmt->rowCount();
        $this->addResponse('Message',"{$this->affected_rows} record(s) sucessfully deleted");
        } catch( Exception $e){
            $this->errorOut($e->getMessage());
        };
    }        
}
?>