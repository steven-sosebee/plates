import { dateCurrTS, dbCall } from "../utils";

export default class ShoppingList {
    constructor(){
        this.class = 'ShoppingList';
        this.body = {};
        this.headers = {
            class:this.class
        }
    };

    async list(){
        const headers={
            class:this.class,
            action:'listAll'
        }

        return dbCall({},headers)
    };

    async delete(id){
        this.body.data={id:parseInt(id)};
        this.headers.action = 'deleteId'
        return dbCall(this.body,this.headers);
    };

    async add(userId, listName){               
        const body = {data:[
            {list_name: listName,
            user_id: userId,
            status: 10}]
        }

        const headers = {
            class:this.class,
            action:"add"
        }

        return dbCall(body,headers)
    }
}