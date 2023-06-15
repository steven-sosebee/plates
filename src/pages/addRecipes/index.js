import { Ingredients } from "./ingredients";
import { Instructions, instructions } from "./instructions"
import { Ingredient, Instruction, Recipe } from "../../classes"
import { useState } from "react";

export const MealAdd =() => {
    const [recipe,setRecipe]=useState();

    const getValue=(x)=>{
        const cellInput = [...x.classList];

        switch (true) {
            case cellInput.includes('text'):
                return x.innerHTML
                break;
            case cellInput.includes('select'):
                return [...x.children][0].value
                break;
            default:
                break;
        }
        
    }
    const recipeSubmit =async (e)=>{
        e.preventDefault();
        const recipeInfo = [
            document.getElementById('recipe_name').value,
            document.getElementById('description').value
        ];
        const instructions = [...document.getElementById('instructions').rows].map((x,i)=>({
            stepTitle: getValue(x.cells[0]), 
            stepCategory: parseInt(getValue(x.cells[1])), 
            stepMinutes:parseInt(getValue(x.cells[3])) || 0,
            stepDescription: getValue(x.cells[2]),
            // recipeId: recipeID,
            stepOrder: i + 1}));
        
        const ingredients = [...document.getElementById('ingredients').rows].map((x,i)=>({
            ingredientName:getValue(x.cells[0]),
            ingredientSizeQty:getValue(x.cells[1]),
            // recipeId: recipeID,
            ingredientSize:getValue(x.cells[2]) 
        }));

        const _recipe = await new Recipe().add({
            name: document.getElementById('recipe_name').value,
            description: document.getElementById('description').value,
            recipe:JSON.stringify(instructions),
            ingredients:JSON.stringify(ingredients)
        });
        // const recipeID = _recipe.newIDs[0];

        // const instructions = [...document.getElementById('instructions').rows].map((x,i)=>({
        //     stepTitle: getValue(x.cells[0]), 
        //     stepCategory: parseInt(getValue(x.cells[1])), 
        //     stepMinutes:parseInt(getValue(x.cells[3])) || 0,
        //     stepDescription: getValue(x.cells[2]),
        //     recipeId: recipeID,
        //     stepOrder: i + 1}));
        
        // const ingredients = [...document.getElementById('ingredients').rows].map((x,i)=>({
        //     ingredientName:getValue(x.cells[0]),
        //     ingredientSizeQty:getValue(x.cells[1]),
        //     recipeId: recipeID,
        //     ingredientSize:getValue(x.cells[2]) 
        // }));
        
        // const _inst = await new Instruction().add(instructions);
        
        // const _ing = await new Ingredient().add(ingredients)
        
        // console.log([_recipe,_inst,_ing]);
        // console.log(_recipe, _ing, _inst);
        console.log(_recipe);
        // window.location.href = `/recipe/${recipeID}`;

    }

    return (
        <div>
        <label>Recipe: </label><input type={'text'} id={'recipe_name'}/>
        <label>Headline: </label><input type={'text'} id={'description'}/>
        <div id={'dropzone'}><p>Drop files here...</p></div>
        <button >Testing</button>
        <h3>Steps</h3>
        <Instructions/>
        <h3>Ingredients</h3>
        <Ingredients/>

        <button onClick={recipeSubmit}>Create Recipe</button>                              
        </div>
    )
}