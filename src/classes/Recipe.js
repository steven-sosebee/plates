import { dateCurrTS, dbCall } from "../utils";

export default class Recipe {
    constructor() {
        this.TS = dateCurrTS();
        this.class = 'Recipe';
    }

    async call(body, header){
        console.log(body)
        return dbCall(body, header)
            .then(res=> (res))
            .catch(err=>console.log(err))
    }
    async add(recipeName, headline){
        this.userId = 1;
        const dbFormat = {
            recipe:[
                {
                    name: recipeName,
                    description: headline,
                    userId: this.userId
                }
        ]
        }

        const headers = {
            class: this.class,
            action:'add'
        }
        
        return dbCall(dbFormat,headers)
    }

    async select(recipeId){
        const headers = {
            class: this.class,
            action:'select'
        }
        const body ={
            id: recipeId
        }
        return dbCall(body, headers)
                .then(res=> (res))
                .catch(err=>console.log(err))
    }

    async delete(recipeId){
        const body = {
            recipeId:recipeId
        }
        const header = {
            class:this.class,
            action:'delete'
        }
        console.log({body,header})
        return this.call(body,header);

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