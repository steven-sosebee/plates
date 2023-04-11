<?php

class Recipe2 extends Base2 {
    protected $tbl;
    protected $fields;
    protected $sqlFields;
    protected $sql;
    protected $affectedRows;

    public function __construct($params){
        parent::__construct();
        $this->tbl='tblRecipes';
        $this->params = $params;
        $this->fields=[
            'id',
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

    public function list(){
        // $this->fields = implode(',',$this->sqlFields);
        // $this->list = $this->runQuery();
        $this->runQuery();
        // $this->addResponse('data',$this->runQuery());
        // $this->response();
        return $this;
    }

    public function select(){
        $this->sql = "SELECT * FROM $this->tbl WHERE id = ?";
        $this->execParams = [$this->params['recipe']['id']];
        $this->ingredients = (new Ingredient($this->params['recipe']))->select();
        // $this->addResponse('ingredients',$ingredients);
        // $this->addResponse('data',$this->runQuery());
        // $this->response();
        $this->runQuery();
        return $this;
    }

    public function delete(){
        $this->id = $this->params['recipe']['id'];
        $this->addResponse('params',$this->id);
        $this->deleted = $this->deleteFrom();
        $this->response();
    }

    public function grocery($params){
        $this->id = $params['recipe']['id'];
        $this->params = $params;
        try{
        // $i = new Ingredient;
        // $iRes = $i->g($this->id);
        // $this->addResponse('Testing',true);
        $this->_connect();
        // $this->addResponse('SERVER',$_SERVER);
        $this->addResponse('id',$this->id);
        $this->addResponse('inputs',$params);
        // $this->addResponse('Ingredient',$iRes);
        $this->addResponse('config', $params['config']['db']);
        $this->response();
        } catch (Exception $e){
            $this->addResponse('err',$e);
            $this->response();
        }
    }
}
?>