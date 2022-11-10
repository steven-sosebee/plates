import { Ingredients } from "./ingredients";
import { Steps } from "../../components/stepsList"
import { Ingredient, Recipe } from "./pageFunctions"
import { useState } from "react";

export const MealAdd =() => {
    const [recipe,setRecipe]=useState();
    // const [recipeId,setRecipeId]=useState();

    // const handleUpdate = (field,data)=>{
    //     const _recipe = {...recipe};
    //     _recipe[field]=data;
    //     setRecipe(_recipe);
    //     console.log(_recipe);
    // }

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
        
        // console.log([...x.classList])

        // console.log([...x.children].map(x=>x.value));
        // x.getElementsByTagName('select').value;
    }
    const testSubmit =async (e)=>{
        e.preventDefault();
        const recipeInfo = [
            document.getElementById('recipe_name').value,
            document.getElementById('description').value
        ];
        const steps = [...document.getElementById('steps').rows].map(x=>[...x.cells].map(x=>getValue(x)));
        // const steps = [...document.getElementsByClassName('step')];
        const ingredients = [...document.getElementById('ingredients').rows].map(x=>[...x.cells].map(x=>getValue(x)));
        const _recipe = new Recipe();
        _recipe.add(recipeInfo)
        .then(res=>{
            console.log(res);
            console.log(ingredients)
            ingredients.map((x,i)=>{
                new Ingredient().add(x[0],x[1],x[2],res.id);
            });
        })
        .then(res=>{
            console.log(steps)
        })
        
        
        console.log(steps.map((x,i)=>([x.value,i + 1])));


    }
    return (
        <div>
        <label>Recipe: </label><input type={'text'} id={'recipe_name'}/>
        <label>Headline: </label><input type={'text'} id={'description'}/>
        <div id={'dropzone'}><p>Drop files here...</p></div>
        <button >Testing</button>
        <h3>Steps</h3>
        <Steps/>
        <h3>Ingredients</h3>
        <Ingredients/>

        <button onClick={testSubmit}>Create Recipe</button>                              
        </div>
    )
}