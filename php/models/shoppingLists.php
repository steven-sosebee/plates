<?php

class ShoppingList extends Base {
    protected $tbl;

    public function __construct(){
        parent::__construct();
        $this->tbl='tblShoppingList';
        $this->fields=[
            'created_at',
            'modified_at',
            'user_id',
            'status',
            'list_name'
        ];
        $this->idField='id';
        $this->displayFields = [
            'created_at',
            'modified_at',
            'user_id',
            'status',
            'list_name'
        ];
    }

    public function add($params){
        $this->fields=[
            'user_id',
            'status',
            'list_name'
        ];
        $this->fieldTypes='iis';

        $this->insertInto();

        $this->stmt->bind_param(
            $this->fieldTypes,
            $user_id,
            $status,
            $list_name
        );

        foreach($params['data'] as $item){
            $user_id = $item['user_id'];
            $status = 10;
            $list_name = $item['list_name'];
            $this->executeInsert();
        }

        $this->response();
    }

}
?>