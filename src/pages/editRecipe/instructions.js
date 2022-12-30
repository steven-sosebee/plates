import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Step } from "./instruction";

export const Instructions =({data=[]})=>{
    // console.log(instructions);
    const [l,setL]=useState(data.map(x=>(<Step instruction={x}/>)));
    const {recipe}=useParams();
    
    
    // useEffect(()=>{
    //     let lastRow = document.getElementById('instructions').getElementsByTagName('tr');
    //     console.log(l.length);
    //     if (l.length>0){
    //         // console.log(lastRow[lastRow.length - 1]);
    //         // l[l.length-1].cells[0].focus();
    //         lastRow[lastRow.length - 1].cells[0].focus();
    //     }    
    // },[l])
    const addStep =(e)=>{
        let _l
        console.log(l.length)
        if (!l) {
            _l=[<Step key={0}/>];
        } else {
            _l=[...l,<Step key={l.length}/>];
        } 
        setL(_l);
        
        
        
    }
    
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Instruction</th>
                    <th>Step Category</th>
                    <th>Details</th>
                    <th>Minutes</th>
                </tr>
            </thead>
            <tbody id="instructions">
                {l}
            </tbody>
        </table>            
        <button onClick={addStep}>Add</button>
        
    </div>
    )
};