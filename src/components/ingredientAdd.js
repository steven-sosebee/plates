import { useEffect, useState } from "react"
import { dbCall } from "../utils/api"

export const IngredientAdd =()=>{
    const [groceries, setGroceries] = useState([]);
    const refresh=()=>{
        dbCall([],{class:"Ingredient",action:'list'})
        .then(data=>setGroceries(data))
    }
    useEffect(()=>{
        refresh();
    },[])

    const add =()=>{
        const ing = document.getElementById("ingredientName").value;
        const qty = document.getElementById("qty").value;
        const measure = document.getElementById("measure").value;

        const body = {
            ingredientName:ing,
            ingredientSizeQty:qty,
            ingredientSize:measure
        }
        const headers = {
            class:"Ingredient",
            action:"add"
        }

        dbCall(body,headers)
        .then(data=>console.log(data))
        .then(refresh());
    };

    const handleDelete =(e)=>{
        const deleteItem = {ingredientsId:e.target.id};
        dbCall(deleteItem,{class:'Ingredient',action:'delete'})
        .then(refresh());
    }
    // const GroceriesList =()=>{if (groceries.length===0){
    //     return (
    //         <p>No grocery items...</p>
    //     )
    // } else {
    //     return (<ul>
    //         {groceries.map(g=>(
    //             <li><span>{g.ingredientSizeQty}</span> {g.ingredientSize} of {g.ingredientName} </li>
    //         ))}
    //     </ul>
    //     )
    // }};

    return (
        <div>
            <p>Ingredient</p><input id="ingredientName"></input>
            <p>Qty</p><input id="qty"></input>
            <p>Measure</p>
            <select id="measure">
                <option>Tspn</option>
                <option>Tbsp</option>
                <option>oz</option>
                <option>gram</option>
                <option>cup</option>
            </select>
            <button onClick={()=>add()}>Add</button>
            <ul>
               {groceries.map(g=>(
                <li id={g.ingredientsId} key={g.ingredientsId}><span>{parseFloat(g.ingredientSizeQty)}</span> {g.ingredientSize} of {g.ingredientName} <button id={g.ingredientsId} onClick={handleDelete}>Delete</button></li>
            ))}
        </ul>
        </div>
        
    )
}