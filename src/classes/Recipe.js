import { dateCurrTS, dbCall } from "../utils";

export default class Recipe {
    constructor() {
        this.TS = dateCurrTS();
        this.class = 'Recipe';
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
        return dbCall({},this.header)
    }
    async add(recipes){
        this.body.recipes =  recipes;

        if(!Array.isArray(recipes)){
            this.body.recipes=[recipes];
        }
        console.log({b: this.body, h:this.header})
        this.header.action='add';        
        return dbCall(this.body,this.header)
    }

    async select(recipeId){
        this.header.action = 'select';
        this.body.recipe = {id:parseInt(recipeId)};
        return dbCall(this.body, this.header)
    }

    async delete(recipeId){
        this.header.action = 'delete';
        this.body.recipe = {id:parseInt(recipeId)};
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
    edit(){
        return this.details
    }
}