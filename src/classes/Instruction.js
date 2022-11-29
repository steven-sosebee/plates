import { dateCurrTS, dbCall } from "../utils";

export default class Instruction {
    constructor(){
        this.class = "Step";
    }
    // add(title,category,description,stepMinutes,order, recipeId){               
    add(instructions,recipeId){
        // let body;
        // console.log(instructions);

        
        // const _inst = {
        //     category: parseInt(category),
        //     stepMinutes: parseInt(stepMinutes),
        //     description: description,
        //     stepTitle: title};
        
        // console.log(_inst);
        // body = {
        //     category: parseInt(category),
        //     stepMinutes: parseInt(stepMinutes),
        //     description: description,
        //     stepTitle: title,
        //     stepOrder: order,
        //     recipeId:recipeId
        // }
        const body={
            instructions:instructions,
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
            recipeId:recipeId
        }

        return dbCall(body,headers)
            .then(res=>(res))
    }
}