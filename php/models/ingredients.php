<?php

class Ingredient extends Base {
    protected $tbl;

    public function __construct(){
        parent::__construct();
        $this->tbl='tblIngredients';
    }

    public function list(){
        $this->sql="SELECT * FROM $this->tbl";
        echo json_encode($this->runQuery());
    }

    public function add($params){
            $sql="INSERT INTO $this->tbl (ingredientName, ingredientSizeQty, ingredientSize, recipeId) VALUES (?,?,?,?)";
            $stmt = $this->connection->prepare($sql);
            foreach ($params['ingredients'] as $ingredient){
                $stmt->bind_param("sdsi",$ingredient['ingredientName'],$ingredient['ingredientSizeQty'],$ingredient['ingredientSize'],$params['recipeId']);
                $stmt->execute();
            }
            $res = $stmt->affected_rows;
            echo json_encode($res);
    }
    
    public function select($params){
        $this->sql="SELECT * from $this->tbl WHERE recipeId=?";
        $stmt = $this->connection->prepare($this->sql);
        $stmt->bind_param("i",$params['id']);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        echo json_encode($res);
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

    public function addToGroceryTbl($groceryName, $groceryMeasure, $groceryPrice){
        $groceries = (object)[
            'groceryName' => $groceryName,
            'groceryPrice' => $groceryPrice,
            'groceryMeasure' => $groceryMeasure
        ];
        $params['groceries'] = $groceries;
        $grocery = (new Grocery)->add($grocery);
    }

    public function delete($params){
        $sql = "DELETE FROM $this->tbl WHERE ingredientsId=?";
        try{
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i",$params['ingredientsId']);
        $stmt->execute();
        $res = $stmt->affected_rows;
        echo json_encode("Ingredient added...");
        } catch( Exception $e){
            echo $e->getMessage();
        };
    }
}
?>