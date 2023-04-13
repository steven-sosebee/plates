import { dateCurrTS, dbCall } from "../utils";

export default class Instruction {
    constructor(){
        this.TS = dateCurrTS();
        this.class = 'Step2';
        this.header = {
            class: this.class
        };
        this.body = {};
    }
    // add(title,category,description,stepMinutes,order, recipeId){               
    async add(instructions){
        this.body =  instructions;

        if(!Array.isArray(instructions)){
            this.body=[instructions];
        }
        // console.log({b: this.body, h:this.header})
        this.header.action='add';        
        return dbCall(this.body,this.header)
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