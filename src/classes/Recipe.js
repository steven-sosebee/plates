import { dateCurrTS, dbCall } from "../utils";

export default class Recipe {
    constructor() {
        this.TS = dateCurrTS();
        this.class = 'Recipe2';
        this.header = {
            class: this.class
        };
        this.body = {};
    }

    // async call(body, header){
    //     console.log(body)
    //     return dbCall(body, header)
    //         .then(res=> (res))
    //         .catch(err=>console.log(err))
    // }

    async list(){
        this.header.action = 'list';
        return dbCall({},this.header);
        
    }
    async add(recipes){
        this.body =  recipes;

        if(!Array.isArray(recipes)){
            this.body=[recipes];
        }
        // console.log({b: this.body, h:this.header})
        this.header.action='add';        
        return dbCall(this.body,this.header)
    }

    async select(recipeId){
        this.header.action = 'select';
        this.body = {id:parseInt(recipeId)};
        return dbCall(this.body, this.header)
    }

    async delete(recipeId){
        this.header.action = 'delete';
        this.body.params = {id:parseInt(recipeId)};
        return dbCall(this.body, this.header)
    }

    async addToList(recipeId){
        const body = {
            recipeId:recipeId
        }
        const header = {
            class:this.class,
            action:'addToList'
        }
    
        return dbCall(body,header);
    }

    async test(){
        this.header.class = 'Grocery2';
        this.body.action = 'test';

        return dbCall(this.body, this.header);
    }
    async grocery(recipeId){
        this.header.action = 'grocery';
        this.body.recipe = {
            id:recipeId
        }
        return dbCall(this.body,this.header)
    }

    async update(recipes){
        this.body =  recipes;

        if(!Array.isArray(recipes)){
            this.body=[recipes];
        }
        this.header.action='update';        
        return dbCall(this.body,this.header)
    }

    edit(){
        return this.details
    }
}