import { dateCurrTS, dbCall } from "../utils";

export default class Ingredient {
    constructor(){
        this.TS = dateCurrTS();
        this.class = 'Ingredient2';
        this.header = {
            class: this.class
        };
        this.body = {};
    }

    refresh(){
            dbCall([],{class:"Ingredient",action:'list'})
            .then(data=>{return data})
    }

    async add(ingredient){
        this.body =  ingredient;

        if(!Array.isArray(ingredient)){
            this.body=[ingredient];
        }
    
        this.header.action='add';        
        return dbCall(this.body,this.header)
    }    
    
    async delete(){
    
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