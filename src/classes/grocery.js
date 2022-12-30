import { dateCurrTS, dbCall } from "../utils";

export default class Grocery {
    constructor(){
        this.class = 'Grocery'
    }

    refresh(){
            dbCall([],{class:this.class,action:'list'})
            .then(data=>{return data})
    }

    async add(groceries){   
        const body ={};            
        console.log(Array.isArray(groceries));
        Array.isArray(groceries) ?
            body.groceries = groceries :
            body.groceries = [groceries]

        const headers = {
            class:this.class,
            action:"add"
        }
        return dbCall(body,headers)
                .then(data=>{return data})
                .catch(err=>console.log(err));

    }
    async delete(id){
        const body = {
            id:id
        }
        const headers = {
            class: this.class,
            action:"delete"
        }

        return dbCall(body,headers)
            .then(data=>{return data})
            .catch(err=>console.log(err));
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