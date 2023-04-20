import { useEffect, useState } from "react"
import { useDnDContext } from "../../context/drag-n-drop";
import { dbCall } from "../../utils";
import { IngredientEl } from "./ingredient";

export const Ingredients =({data=[]})=>{
    // console.log(data.map(x=>(<Ingredient ingredient={x}/>)));
    const [l,setL]=useState(data.map(x=>(<IngredientEl ingredient={x}/>)));
    const {handleDrag, handleDrop, handleDragStart} = useDnDContext();
    // useEffect(()=>{
    //     let lastRow = document.getElementById('ingredients').getElementsByTagName('tr');
    //     // console.log(l.length);
    //     if (l.length>0){
    //         // console.log(lastRow[lastRow.length - 1]);
    //         // l[l.length-1].cells[0].focus();
    //         lastRow[lastRow.length - 1].cells[0].focus();
    //     }    
    // },[l])

    const dragStart = (e)=>{
        const d = handleDragStart(e,'ingredients')
        console.log(d);
    }
    const addIngredient=()=>{
        let _l
        if (!l) {
            _l=[<IngredientEl key={0}/>];
        } else {
            _l=[...l,<IngredientEl key={l.length}/>];
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