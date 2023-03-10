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
    async add(items){               
        const body = {
            item:items
        }

        const headers = {
            class:this.class,
            action:"add"
        }
        // return ({headers,body})
        return dbCall(body,headers)
        // .then(data=>{return data})
        // .catch(err=>console.log(err));

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

    async select(listId){
        const headers={
            class:this.class,
            action:'select'
        }
        const body={
            id:parseInt(listId)
        }

        return dbCall(body,headers)
    }
}