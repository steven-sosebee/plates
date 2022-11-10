import { dateCurrTS, dbCall } from "../utils";

export default class Instruction {
    constructor(){
        this.class = "Step";
    }
    add(){
        
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
            action:'list'
        }
        const body={
            id:recipeId
        }

        return dbCall(body,headers)
            .then(res=>(res))
    }
}