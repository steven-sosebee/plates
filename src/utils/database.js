import { dbCall } from "./api";

export const dbDelete = async (body, class)=>{
    return dbCall(body,class)
    .then(res=>return res)

}