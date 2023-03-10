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
    // public function add($params){
    //     $this->fields=[
    //         'groceryId',
    //         'listId',
    //         'completed',
    //     ];
    //     $this->fieldTypes='iii';
    //     $fields = implode(',',$this->fields);
    //     $values = '?';
    //     for ($i=1; $i<sizeof($this->fields); $i++){
    //         $values = $values.',?';
    //     }
    //     $this->sql = "INSERT INTO $this->tbl ($fields) VALUES ($values)";
    //     parent::prepare();
    //     $this->stmt->bind_param(
    //         $this->fieldTypes,
    //         $groceryId,
    //         $listId,
    //         $completed
    //     );
    //     $this->res['time'] = time();
    //     $this->res['stmts'] = array();
    //     foreach($params['item'] as $item){
    //         $time = time();
    //         $groceryId = $item['groceryId'];
    //         $listId = $item['listId'];
    //         $completed = false;
    //         parent::execute();
    //         array_push($this->res,$this->stmt);
    //     }
    //     // echo json_encode($res);
    //     parent::response();
    // }
    public function add($params){
        $this->fields=[
            'groceryId',
            'listId',
            'completed',
        ];
        $this->fieldTypes='iii';
        $this->insertInto();

        $this->stmt->bind_param(
            $this->fieldTypes,
            $groceryId,
            $listId,
            $completed
        );
        foreach($params['item'] as $item){
            $time = time();
            $groceryId = $item['groceryId'];
            $listId = $item['listId'];
            $completed = false;
            $this->executeInsert();
            // array_push($this->res,$this->stmt);
            // $this->res['item']=$item;
        }
        // echo json_encode($res);
        $this->response();
    }

    public function select($params){
        $this->sql="SELECT groceryName from tblGroceries JOIN $this->tbl t ON tblGroceries.id = t.groceryId WHERE t.listId=?";
        $this->stmt = $this->connection->prepare($this->sql);
        $this->stmt->bind_param("i",$params['id']);
        $this->stmt->execute();
        $this->res['data'] = $this->stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $this->response();  
    }

    // public function select($params){
    //     $this->listId = $params['data']['id'];
    //     $this->sql = "SELECT * FROM $this->tbl WHERE listId = ?";
    //     $this->stmt = 
    // }
}
?>