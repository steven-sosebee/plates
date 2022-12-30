<?php

class Grocery extends Base {

    protected $tbl;

    public function __construct(){
        parent::__construct();
        $this->tbl='tblGroceries';
        $this->fields=[
            'groceryName',
            'groceryMeasure',
            'groceryPrice'
        ];
        $this->idField='id';
        $this->fieldTypes='ssd';
    }

    public function list(){
        $this->sql="SELECT * FROM $this->tbl";
        echo json_encode($this->runQuery());
    }
    
    public function add($params){
        $fields = implode(',',$this->fields);        
        $this->sql = "INSERT INTO $this->tbl ($fields) VALUES (?,?,?)";
        $stmt = $this->connection->prepare($this->sql);
        $stmt->bind_param($this->fieldTypes, $name, $measure, $price);
        foreach ($params['groceries'] as $grocery){
            $name = $grocery['groceryName'];
            $measure = $grocery['groceryMeasure'];
            $price = $grocery['groceryPrice'];
            $stmt->execute();
        }
        $res = $stmt->affected_rows;
        echo json_encode($res);
    }

    public function delete($params){
        $sql = "DELETE FROM $this->tbl WHERE $this->idField=?";
        try{
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i",$params['id']);
        $stmt->execute();
        $res = $stmt->affected_rows;
        echo json_encode("Grocery deleted...");
        } catch( Exception $e){
            echo $e->getMessage();
        };
    }
}
?>