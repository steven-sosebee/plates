import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Step } from "./step";

export const Steps =()=>{
    const [l,setL]=useState([]);
    const {recipe}=useParams();

    useEffect(()=>{

    })
    const addStep =(e)=>{
        let _l
        if (!l) {
            _l=[<Step/>];
        } else {
            _l=[...l,<Step/>];
        } 
        setL(_l);
    }

    // const submit =()=>{
    
    //     const _steps = [...document.querySelectorAll('input')];
    //     let x =_steps.map(step=>(
    //       step.value
    //     ))
    //     const body={
    //       recipeId:pageData.activeMeal.recipeId,
    //       steps:x,
    //       category:1
    //     };
    //     const headers={
    //       class:'Step',
    //       action:'add'
    //     }
    //     dbCall(body, headers)
    //   }  

    // return (
    //     <div>
    //         <div className="flex">
    //             <ul>
    //                 {l}
    //             </ul>
    //         </div>
    //         <button onClick={addStep}>Add Step +</button>
    //     </div>
    // )
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