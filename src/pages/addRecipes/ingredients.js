import { useEffect, useState } from "react"
import { dbCall } from "../../utils";
import { Ingredient } from "./ingredient";

export const Ingredients =()=>{
    const [l,setL]=useState([]);
    
    // const handleClick =(e)=>{
    //     const ing = document.getElementById("ingredientName").value;
    //     const qty = document.getElementById("qty").value;
    //     const measure = document.getElementById("measure").value;

    //     const newIngredient = new Ingredient(ing,qty,measure).add();
        
    // }

    const addIngredient=()=>{
        let _l
        if (!l) {
            _l=[<Ingredient/>];
        } else {
            _l=[...l,<Ingredient/>];
        } 
        setL(_l);
        // console.log(_l);
        // handleUpdate('steps',_l);
    };

    return (
        <div>
            <table><thead><tr><th>Ingredient</th><th>Qty</th><th>Measure</th></tr></thead>
                <tbody id="ingredients">
                    {l}
                </tbody>
            </table>            
            <button onClick={addIngredient}>Add</button>
            
        </div>
        
    )
}