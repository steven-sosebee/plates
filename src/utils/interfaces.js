export const clearForm = () =>{
    const inputs = document.getElementsByTagName('input');
    console.log(inputs);
    for (let input = 0; input < inputs.length; input++) {
        inputs[input].value=null;
    }
    
}

export const listRemove = (item, list, id) => {
    const idx = list.findIndex((x)=>x.id===item.id);
    let _list = [...list];
    _list.splice(idx,1);
    console.log(_list);
    return _list;

}