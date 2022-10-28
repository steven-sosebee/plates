import { isObjEmpty } from "./validations";

export const dbCall = async (body={}, headers)=>{
    
    let params={headers};
    
    if (isObjEmpty(body)){
        params.method = "GET";
    } else {
        params.method = "POST";
        params.body=JSON.stringify(body);
    }

    return fetch(
        "/php/",
        params
    )
    .then(res=>res.json())
    .then(data=>{return data})
    .catch(error=>console.log(error))
};

export const dbDelete =async (body, model)=>{
    return dbCall(body,{class:model,action:'delete'})
    .then(res=>{return res});
}