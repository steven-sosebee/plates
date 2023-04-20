import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Step } from "./instruction";

export const Instructions =()=>{
    const [l,setL]=useState([]);
    const {recipe}=useParams();
    
    
    useEffect(()=>{
        let lastRow = document.getElementById('instructions').getElementsByTagName('tr');
        if (l.length>0){
            // console.log(lastRow[lastRow.length - 1]);
            // l[l.length-1].cells[0].focus();
            lastRow[lastRow.length - 1].cells[0].focus();
        }    
    },[l])
    const addStep =(e)=>{
        let _l
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