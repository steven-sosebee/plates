import { useEffect, useState } from "react"
import { dbCall } from "../../utils";
import { Ingredient } from "./ingredient";

export const Ingredients =({data=[]})=>{
    console.log(data.map(x=>(<Ingredient ingredient={x}/>)));
    const [l,setL]=useState();
    
    // useEffect(()=>{
    //     let lastRow = document.getElementById('ingredients').getElementsByTagName('tr');
    //     // console.log(l.length);
    //     if (l.length>0){
    //         // console.log(lastRow[lastRow.length - 1]);
    //         // l[l.length-1].cells[0].focus();
    //         lastRow[lastRow.length - 1].cells[0].focus();
    //     }    
    // },[l])

    const addIngredient=()=>{
        let _l
        if (!l) {
            _l=[<Ingredient/>];
        } else {
            _l=[...l,<Ingredient/>];
        } 
        setL(_l);
    
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