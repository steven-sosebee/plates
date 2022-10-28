export const isObjEmpty=(obj)=>{
    return Object.keys(obj).length===0;
};

export const dateCurrTS=()=>{
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
};
