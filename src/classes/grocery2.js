import { dateCurrTS, dbCall } from "../utils";

export default class Grocery2 {
    constructor(){
        this.header = {};
        this.body = {};
        this.header.class = 'Grocery2';
    }

    async test(){
        this.header.action = 'test';
        // return {body: this.body,header:this.header};
        return dbCall(this.body,this.header);
    }
}