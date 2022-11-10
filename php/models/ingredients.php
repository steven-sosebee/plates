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
        $userId=1;
            $sql="INSERT INTO $this->tbl (ingredientName, ingredientSizeQty, ingredientSize, recipeId) VALUES (?,?,?,?)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("sdsi",$params['ingredientName'],$params['ingredientSizeQty'],$params['ingredientSize'],$params['recipeId']);
            $stmt->execute();
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