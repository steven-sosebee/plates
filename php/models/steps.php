<?php

class Step2 extends Base2 {
    protected $tbl;
    protected $fields;
    protected $sqlFields;
    protected $sql;
    protected $affectedRows;

    public function __construct($params, $db){
        
        $this->tbl='tblSteps';
        $this->params = $params;
        $this->fields=[
            'id',
            'stepOrder',
            'stepDescription',
            'stepCategory',
            'recipeId',
            'stepTitle',
            'stepMinutes'
        ];
        $this->addFields=[
            'stepOrder',
            'stepDescription',
            'stepCategory',
            'recipeId',
            'stepTitle',
            'stepMinutes'
        ];
        $this->sqlFields = implode(',',$this->fields);
        $this->idField='id';
        $this->sql = "SELECT $this->sqlFields FROM $this->tbl";
        $this->database = $db;
        parent::__construct();
    }

    public function add(){
        // $this->items = $params['params'];
        try{
        $this->insertInto();
        return $this;
        }
        catch (Exception $e){
            return $e->getMessage();
        }
    }

    public function list(){
        $this->runQuery();
        return $this;
    }

    public function select(){
        $this->sql = "SELECT * FROM $this->tbl WHERE id = ?";
        $this->execParams = [$this->params['params']['id']];
        $this->runQuery();
        return $this;
    }
    
    public function recipeSelect(){
        $this->sql = "SELECT * FROM $this->tbl WHERE recipeId = ?";
        $this->execParams = [$this->params['id']];
        $this->runQuery();
        return $this;
    }
    public function delete(){
        $id = $this->params['params']['id'];
        $this->deleteFrom($id);
        return $this;
    }

    public function recipeDelete(){
        $this->deleteSQL = "DELETE FROM $this->tbl WHERE recipeId = ?";
        $id = $this->params;
        $this->deleteFrom($id);
        return $this;
    }

    public function update(){
        $addItems=array();
        $this->sql = "UPDATE $this->tbl 
            SET 
            stepOrder = ?,
            stepDescription = ?,
            stepCategory = ?,
            recipeId = ?,
            stepTitle = ?,
            stepMinutes = ?
            WHERE
                id = ?";
        
        $this->stmt=$this->database->PDOConn->prepare($this->sql);
        // $this->test = $this->params;
            foreach($this->params as $item){
                $order = $item['stepOrder'];
                $description = $item['stepDescription'];
                $category = $item['stepCategory'];
                $recipeId = $item['recipeId'];
                $title = $item['stepTitle'];
                $minutes = $item['stepMinutes'];
                
                $id = $item['id'];

                if(!$id){
                    $addItems[] = $item;
                    continue;
                }

                $this->stmt->execute([
                    $order,
                    $description,
                    $category,
                    $recipeId,
                    $title,
                    $minutes,
                    $id]);
                $this->affected_rows = $this->affected_rows + $this->stmt->rowCount();
            }
            $this->updated = "{$this->affected_rows} record(s) sucessfully updated";
            if(sizeof($addItems)>0){
                // $this->added = $addItems;
                $this->added = (new Step2($addItems))->add();
            };
            
        return $this;
    }

    public function getIngredients(){

    }

}
?>