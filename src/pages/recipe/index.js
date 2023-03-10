import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { dbCall } from "../../utils";
import { Steps } from "../../components/stepsList";
import { Ingredient, Instruction, Recipe } from "../../classes";
import { Instructions } from "./instructions";
import { Ingredients } from "./ingredients";

export const RecipePage=()=>{
    const [cookbook,setCookbook]=useState();
    const [_ing,setIng] = useState();
    const [_inst,setInst] = useState();
    // const [steps, setSteps] = useState();
    const [loading,setLoading] = useState(true);
    const {recipe}=useParams();
    // const params = new URLSearchParams(window.location.search);
    // const id= params.get('id');
    const headers={
        class:'Recipe',
        action:'select'
    };
    const body={
        id:recipe
    }
    const handleEdit =()=>{
        window.location.href = `/recipe/edit/${recipe}`;
    }
    const addToList = async () => {
        // console.log(_ing);
        const r = await new Recipe().addToList(recipe);
        console.log(r);
    }
    useEffect(()=>{
        const getData = async ()=>{
            const promises = [
                new Recipe().select(recipe),
                new Ingredient().select(recipe),
                new Instruction().select(recipe)
            ]
            Promise.all(promises)
                .then(res => {
                    setCookbook(res[0]);
                    setIng(res[1]); 
                    setInst(res[2]);
                    setLoading(false);
                })
        }
        
        getData()
    }, [])

    if (loading){
        return (
            <p>Loading...</p>
        )
    }
    return(
        <>
        <div>Recipe Name: <span>{cookbook[0].recipe_name}</span></div>
        <button onClick={addToList}>Add to shopping list</button>
        <Ingredients ingredients={_ing}/>
        <Instructions steps={_inst}/>
        <button onClick={handleEdit}>Edit Recipe</button>
        </>
    )
}