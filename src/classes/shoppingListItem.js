import { dateCurrTS, dbCall } from "../utils";

export default class ShoppingListItems {
    constructor(){
        this.class = 'ShoppingListItem'
    }

    // refresh(){
    //         dbCall([],{class:"Ingredient",action:'list'})
    //         .then(data=>{return data})
    // }
    async testing (groceryId,listId){
        const body = {
            item:[{
                groceryId: groceryId,
                listId: listId
            }]
        }
        console.log(body);
        return dbCall(body,{
            class:this.class,
            action:"add"
        })
    }
    async add(items, listId){               
        const body = {
            items:items,
            listId:listId
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