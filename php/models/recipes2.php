<?php

class Recipe2 extends Base2 {
    protected $tbl;

    public function __construct(){
        parent::__construct();
        $this->tbl='tblRecipes';
        $this->fields=[
            'name',
            'description',
            'userId'
        ];
        $this->sqlFields = implode(',',$this->fields);
        $this->idField='id';
        $this->sql = "SELECT $this->sqlFields FROM $this->tbl";
    }

    public function add($params){
        $this->items = $params['recipes'];
        try{
        $this->insertInto();
        $this->response();
        }
        catch (Exception $e){
            $this->res['error'] = $e->getMessage();
        }
    }

    public function list($params){
        // $this->fields = implode(',',$this->sqlFields);
        $this->addResponse('data',$this->runQuery());
        // $this->addResponse("connection",true);
            // $this->addResponse('PDO',$this->PDOConn->getAttribute("PDO::ATTR_ERRMODE"));
        $this->response();

    }

    public function select($params){
        $this->sql = "$this->sql WHERE id = {$params['recipe']['id']}";
        $this->addResponse('data',$this->runQuery());
        $this->response();
    }

    public function delete($params){
        $this->id = $params['recipe']['id'];
        $this->addResponse('data',$this->deleteFrom());
        $this->response();
    }
}
?>