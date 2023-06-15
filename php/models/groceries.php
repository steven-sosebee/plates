<?php

    class Grocery extends Base{

        function __construct(){
            $this->table = 'tblGroceries';
        }

        public function test($t = null){
            $this->sql = "SELECT * FROM tblGroceries";
            $this->data = $this->runQuery();
            $this->ingredients = new Ingredient;
            $this->ingredients->test();
        }
    }
?>