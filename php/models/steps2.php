<?php

class Step2 extends Base2 {
    protected $tbl;
    protected $fields;
    protected $sqlFields;
    protected $sql;
    protected $affectedRows;

    public function __construct($params){
        parent::__construct();
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
        $this->ingredients = (new Ingredient($this->params['recipe']))->select();
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

    public function getIngredients(){

    }

}
?>