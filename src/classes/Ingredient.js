import { dateCurrTS, dbCall } from "../utils";

export default class Ingredient {
    constructor(){
        this.class = 'Ingredient'
    }

    refresh(){
            dbCall([],{class:"Ingredient",action:'list'})
            .then(data=>{return data})
    }

    async add(ingredients, recipeId){               
        
        const body = {
            ingredients:ingredients,
            recipeId:recipeId
        }

        const headers = {
            class:this.class,
            action:"add"
        }

        return dbCall(body,headers)
        .then(data=>{return data})
        .catch(err=>console.log(err));

    }
    delete(){
    
    }

    async list(){
        const headers={
            class:this.class,
            action:'list'
        }

        return dbCall({},headers)
            .then(res=>(res))
    }

    async select(recipeId){
        const headers={
            class:this.class,
            action:'select'
        }
        const body={
            id:recipeId
        }

        return dbCall(body,headers)
            .then(res=>(res))
    }
}