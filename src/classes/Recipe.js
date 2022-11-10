import { dateCurrTS, dbCall } from "../utils";

export default class Recipe {
    constructor() {
        this.TS = dateCurrTS();
        this.class = 'Recipe';
    }

    async add(recipeName, headline){
        this.userId = 1;
        this.recipe_name = recipeName;
        this.description = headline;
        this.dbFormat = {
            recipe_name: this.recipe_name,
            description: this.description,
            userId: this.userId,
            created_at: this.TS,
            updated_at:this.TS
        }

        const headers = {
            class: this.class,
            action:'add'
        }
        return dbCall(this.dbFormat,headers)
            .then(res=>{
                console.log(res)
                return res})
            .catch(err=>console.log(err))

    }

    select(recipeId){
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

    delete(){

    }

    edit(){
        return this.details
    }
}