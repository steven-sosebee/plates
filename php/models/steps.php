<?php

class Step extends Base {

    protected $tbl;

    public function __construct(){
        parent::__construct();
        $this->tbl='tblSteps';
    }

    public function list($params){
        $this->sql="SELECT * FROM $this->tbl WHERE recipeId=?";
        $stmt = $this->connection->prepare($this->sql);
        $stmt->bind_param('i',$params['recipeId']);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        echo json_encode($res);
    }

    public function add($params){
        $sql="INSERT INTO $this->tbl (recipeId, stepDescription,stepCategory) VALUES (?,?,?)";
        $stmt = $this->connection->prepare($sql);
        foreach ($params['steps'] as $step){
            $stmt->bind_param("iss",$params['recipeId'],$step,$params['category']);
            $stmt->execute();
        }
        $res = $stmt->affected_rows;
        echo json_encode($res);
    }

    public function select($params){
        $this->sql="SELECT * from $this->tbl WHERE recipeId=?";
        $stmt = $this->connection->prepare($this->sql);
        $stmt->bind_param("i",$params['recipeId']);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        echo json_encode($res);
    }

    public function delete($params){
        $sql = "DELETE FROM $this->tbl WHERE stepId=?";
        try{
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i",$params['stepId']);
        $stmt->execute();
        $res = $stmt->affected_rows;
        echo json_encode("Step deleted...");
        } catch( Exception $e){
            echo $e->getMessage();
        };
    }
}

?>