<?php

class Recipe2 extends Base {
    protected $tbl;

    public function __construct(){
        parent::__construct();
        $this->tbl='tblRecipes';
        $this->fields=[
            'name',
            'description',
            'created_date',
            'created_at',
            'modified_at',
            'userId'
        ];
        $this->idField='id';  
    }

    public function add($params){
        $this->fields=[
            'name',
            'description',
            'userId'        
        ];

        $this->fieldTypes='ssi';

        try{
        $this->insertInto();

        $this->stmt->bind_param(
            $this->fieldTypes,
            $name,
            $description,
            $userId
        );

        foreach($params['recipe'] as $item){
            $name = $item['name'];
            $userId = $item['userId'];
            $description = $item['description'];

            $this->executeInsert();
        }

        $this->response();
        }
        catch (Exception $e){
            $this->res['error'] = $e->getMessage();
        }
    }
     // public function addConstruct(){
    //     // add variables...
    //     $this->addFields=[
    //         'recipe_name',
    //         'description',
    //         'userId'        ];

    //     $this->addFieldTypes='ssi';
    //     $this->bindParams = (array)[
    //         $recipe_name,
    //         $description,
    //         $recipeUser
    //     ];
    //     $this->addStmt->bind_param(
    //         $this->addFieldTypes,
    //         $recipe_name,
    //         $description,
    //         $recipeUser
    //     );
    //     $this->addArray = $params['recipes'];

    //     foreach($this->addArray as $item){
    //         $name = $item['name'];
    //         $userId = $item['userId'];
    //         $description = $item['description'];

    //     }
    // }
}
?>