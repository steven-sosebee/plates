import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { dbCall } from "../../utils";
import { Steps } from "../../components/stepsList";
import { Ingredient, Instruction, Recipe } from "../../classes";
import { Instructions } from "../addRecipes/instructions";

export const RecipePage=()=>{
    let cookbook;
    let instructions;
    const [steps, setSteps] = useState();
    const [loading,setLoading] = useState(true);
    const {recipe}=useParams();
    const params = new URLSearchParams(window.location.search);
    const id= params.get('id');
    const headers={
        class:'Recipe',
        action:'select'
    };
    const body={
        id:recipe
    }

    const getSteps = (id)=>{
        const headers={
            class:'Step',
            action:'list'
        };
        const body={
            recipeId:id
        };

        dbCall(body,headers)
        .then(res=>console.log(res));
    }

    useEffect(()=>{

        const promises = [
            new Recipe().select(recipe),
            new Ingredient().select(recipe),
            new Instruction().select(recipe)
        ]
        Promise.all(promises)
        .then(res => console.log(res))
        // console.log(recipe);
        // dbCall(body,headers)
        // const _recipe = new Recipe().select(recipe);
        // _recipe
        // .then(res=>cookbook=res)
        // // .then(res=>getSteps(res[0].recipeId))
        // .then(res=>(new Ingredient().list(res[0].recipeId)))
        // .then(res=>(new Instruction().list(res[0].recipeId)))
        // .then(data=>{console.log(data); setSteps(data); setLoading(false)})
    },[])

    if (loading){
        return (
            <p>Loading...</p>
        )
    }
    return(
        <>
        <div>Router-dom Param: <span>{recipe}</span></div>
        <div>Search Param: <span>{id}</span></div>
        <div>Recipe Name: <span>{cookbook}</span></div>
        <Instructions steps={steps}/>

        </>
    )
}