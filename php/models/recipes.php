<?php
    class Recipe extends Base
    {
        protected $tbl;
        
        public function __construct(){
            parent::__construct();
            $this->tbl='recipe';
        }
        public function add($params){
            $userId=1;
            $sql="INSERT INTO recipe (recipe_name,recipeUser,created_at) VALUES (?,?,?)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("sis",$params['recipe_name'],$userId,$params['created_at']);
            $stmt->execute();
            // $res = $stmt->affected_rows;
            $res['id'] =  mysqli_insert_id($this->connection);
            echo json_encode($res);
        }

        public function list(){
            $this->sql="SELECT * FROM recipe";
            echo json_encode($this->runQuery());
        }

        public function select($params){
            $this->sql="SELECT * from $this->tbl WHERE recipeId=?";
            $stmt = $this->connection->prepare($this->sql);
            $stmt->bind_param("i",$params['id']);
            $stmt->execute();
            $res = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            echo json_encode($res);
        }
        public function delete(){
            $sql = "DELETE FROM recipe";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute();
            $res = $stmt->affected_rows;
            echo json_encode($res);
        }
    }
    
?>