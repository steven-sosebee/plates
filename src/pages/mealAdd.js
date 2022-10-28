import React, { useEffect, useRef, useState } from "react";
import { dateCurrTS, dbCall,dbDelete } from "../utils";

export const MealAdd=()=>{
    const [recipeId,setRecipeId]=useState();
    const [steps, setSteps]=useState([]);
    const r=useRef(null);
    const [currentStep,setCurrentStep]=useState();
    const [recipeState,setRecipeState]=useState();
    let newMeal={};

    const changeInput=(e)=>{
        console.log(e.target.value);
    }
    const Step =()=>{
        return (<div>
            <input placeholder="step..."/><button>Delete</button>
        </div>)
    }
    const addStep =(e)=>{
        const _steps=[...steps,<Step/>]
        setSteps(_steps);
    }
    const handleSubmit =async ()=>{
        
        newMeal.recipe_name=document.getElementById("recipe").value;
        newMeal.description=document.getElementById("description").value;
        newMeal.created_at=dateCurrTS();
        
        const headers = {
            class:'Recipe',
            action:'add'
        };

        dbCall(newMeal,headers)
        .then(res=>{
            if(res>0){
                console.log('Successfully added...')
            }
        });
    };

    return (
        <section>
                <div id="recipe-submit">
                    <label>Recipe</label><input onChange={(e)=>changeState(e)} id="recipe" type={"text"}/>
                    <label>Description</label><input id="description" type={"text"}/>
                    <button onClick={()=>handleSubmit()}>Submit</button>
                    <button id={'btn'} onClick={(e)=>addStep(e)}>Add Step</button>
                 </div>
                <div id="step-list">
                    {steps}
                </div>
        </section>
    )
}
