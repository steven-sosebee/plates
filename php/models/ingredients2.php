<?php

class Ingredient2 extends Base2 {
    // protected $tbl;

    public function __construct($params){
        // parent::__construct();
        $this->tbl='tblIngredients';
        $this->params = $params;
        $this->fields=[
            'ingredientName', 
            'ingredientSizeQty', 
            'ingredientSize', 
            'recipeId'
        ];
        $this->addFields=[
            'ingredientName', 
            'ingredientSizeQty', 
            'ingredientSize', 
            'recipeId'
        ];
        $this->sqlFields = implode(',',$this->fields);
        $this->idField='id';
        $this->sql = "SELECT $this->sqlFields FROM $this->tbl";
        parent::__construct();
    }

    public function list(){
        $this->sql="SELECT * FROM $this->tbl";
        echo json_encode($this->runQuery());
    }

    public function test(){
        $this->sql = "SELECT * FROM tblIngredients";
        $this->data = $this->runQuery();
        return $this->data;
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

    public function select(){
        $this->sql="SELECT * from $this->tbl WHERE recipeId=?";
        $this->execParams = [$this->params['id']];
        $this->runQuery();
        return $this;
    }

    public function recipeSelect(){
        $this->sql="SELECT * from $this->tbl WHERE recipeId=?";
        $this->execParams = [$this->params['id']];
        $this->runQuery();
        return $this;
    }
    public function select2($params){
        $this->sql="SELECT DISTINCT ingredientName FROM tblIngredients i 
            LEFT JOIN tblGroceries g ON i.ingredientName=g.groceryName 
            WHERE i.recipeId=? AND g.groceryName IS NULL";
        $stmt = $this->connection->prepare($this->sql);
        $stmt->bind_param("i",$params['recipeId']);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        return $res;
    }
    public function g($id){
        $this->id=$id;
        $this->sql="SELECT * from $this->tbl  WHERE recipeId=?";
        $this->addResponse('iID', $this->id);
        $this->execParams = array($this->id);
        $this->addResponse('data', $this->runQuery());
        $this->addResponse('complete', true);
        // $this->addResponse('config', config);
        return $this->response;
    }
    
    public function addToGroceryTbl($groceryName, $groceryMeasure, $groceryPrice){
        $groceries = (object)[
            'groceryName' => $groceryName,
            'groceryPrice' => $groceryPrice,
            'groceryMeasure' => $groceryMeasure
        ];
        $params['groceries'] = $groceries;
        $grocery = (new Grocery)->add($grocery);
    }

    public function delete(){
        // $this->deleteSQL = "DELETE FROM $this->tbl WHERE id = ?";
        $id = $this->params['params']['id'];
        $this->testing=$id;
        $this->deleteFrom($id);
        return $this;
    }
    
    public function update(){
        $addItems=array();

        $this->sql = "UPDATE $this->tbl 
            SET 
            ingredientName = ?, 
            ingredientSizeQty = ?, 
            ingredientSize = ?, 
            recipeId = ?
            WHERE
                id = ?";
        
        $this->stmt=CONN->PDOConn->prepare($this->sql);
        // $this->test = $this->params;
            foreach($this->params as $item){
                $name = $item['ingredientName'];
                $sizeQty = $item['ingredientSizeQty'];
                $size = $item['ingredientSize'];
                $recipeId = $item['recipeId'];
                $id = $item['id'];

                if(!$id){
                    $addItems[] = $item;
                    continue;
                }
                $this->stmt->execute([
                    $name,
                    $sizeQty,
                    $size,
                    $recipeId,
                    $id]);
                $this->affected_rows = $this->affected_rows + $this->stmt->rowCount();
            }
            $this->updated = "{$this->affected_rows} record(s) sucessfully updated";
            if(sizeof($addItems)>0){
                $this->added = (new Ingredient2($addItems))->add();
            };
            
        return $this;
    }

    public function recipeDelete(){
        $this->deleteSQL = "DELETE FROM $this->tbl WHERE recipeId = ?";
        $id = $this->params;
        $this->deleteFrom($id);
        return $this;
    }
}
?>