<?php

class ShoppingListItems extends Base {
    protected $tbl;

    public function __construct(){
        parent::__construct();
        $this->tbl='tblShoppingListItems';
        $this->fields=[
            'created_at',
            'modified_at',
            'groceryId',
            'listId',
            'completed',
            'completed_at'
        ];
        $this->idField='id';
    }

    public function testing($params){
        parent::test();
    }
    public function add($params){
        $this->fields=[
            'groceryId',
            'listId',
            'completed',
        ];
        $this->fieldTypes='iii';
        $fields = implode(',',$this->fields);
        $values = '?';
        for ($i=1; $i<sizeof($this->fields); $i++){
            $values = $values.',?';
        }
        $this->sql = "INSERT INTO $this->tbl ($fields) VALUES ($values)";
        parent::prepare();
        $this->stmt->bind_param(
            $this->fieldTypes,
            $groceryId,
            $listId,
            $completed
        );
        $this->res['time'] = time();
        $this->res['stmts'] = array();
        foreach($params['item'] as $item){
            $time = time();
            $groceryId = $item['groceryId'];
            $listId = $item['listId'];
            $completed = false;
            parent::execute();
            array_push($this->res,$this->stmt);
        }
        // echo json_encode($res);
        parent::response();
    }
}
?>