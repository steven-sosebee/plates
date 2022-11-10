import { dateCurrTS, dbCall } from "../utils";

export default class Ingredient {
    constructor(){
        // this.ingredientName = ingredient;
        // this.qty = qty;
        // this.measure = measure;
        this.class = 'Ingredient'
    }
    refresh(){
            dbCall([],{class:"Ingredient",action:'list'})
            .then(data=>{return data})
    }
    add(ingredient, qty, measure, recipeId){               
        const body = {
            ingredientName:ingredient,
            ingredientSizeQty:qty,
            ingredientSize:measure,
            recipeId:recipeId
        }
        const headers = {
            class:this.class,
            action:"add"
        }

        dbCall(body,headers)
        .then(data=>{return data})
        .catch(err=>console.log(err));

    }
    delete(){
        const handleDelete =(e)=>{
            const deleteItem = {ingredientsId:e.target.id};
            dbCall(deleteItem,{class:'Ingredient',action:'delete'})
            .then(refresh());
        }
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