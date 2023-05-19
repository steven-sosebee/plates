<?php

class Recipe2 extends Base2 {
    // protected $tbl;
    protected $fields;
    protected $sqlFields;
    protected $sql;
    protected $affectedRows;

    public function __construct($params, $db){
        $this->tbl='tblRecipes';
        $this->params = $params;
        $this->fields=[
            'id',
            'name',
            'description',
            'userId'
        ];
        $this->addFields=[
            'name',
            'description'
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
        $this->execParams = [$this->params['id']];
        $this->ingredients = (new Ingredient2($this->params, $this->database))->recipeSelect();
        $this->instructions = (new Step2($this->params, $this->database))->recipeSelect();
        $this->runQuery();
        return $this;
    }

    public function delete(){
        $this->deleteSQL = "DELETE FROM $this->tbl WHERE id = ?";
        $id = $this->params['params']['id'];
        $this->ingredients = (new Ingredient2($id))->recipeDelete();
        $this->instructions = (new Step2($id))->recipeDelete();
        $this->deleteFrom($id);
        return $this;
    }

    public function update(){
        $this->sql = "UPDATE $this->tbl 
            SET 
                name = ?, 
                description = ?
            WHERE
                id = ?";
        
        $this->stmt=$this->database->PDOConn->prepare($this->sql);
        // $this->test = $this->params;
            foreach($this->params as $item){
                $name = $item['name'];
                $description = $item['description'];
                $id = $item['id'];        
                $this->stmt->execute([$name,$description,$id]);
                $this->affected_rows = $this->affected_rows + $this->stmt->rowCount();
                $this->ingredients = (new Ingredient2($item['ingredients']))->update();
                $this->instructions = (new Step2($item['instructions']))->update();
            }
            $this->message = "{$this->affected_rows} record(s) sucessfully updated";
  
        return $this;
    }
    public function getIngredients(){

    }

}
?>