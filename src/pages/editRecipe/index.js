import { Ingredients } from "./ingredients";
import { Instructions, instructions } from "./instructions"
import { Ingredient, Instruction, Recipe } from "../../classes"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const RecipeEdit =() => {
    const [cookbook,setCookbook]=useState();
    const [_ing,setIng] = useState();
    const [_inst,setInst] = useState();
    const [loading,setLoading] = useState(true);
    const {recipe}=useParams();

    useEffect(()=>{
        const getData = async ()=>{
            const promises = [
                new Recipe().select(recipe),
                new Ingredient().select(recipe),
                new Instruction().select(recipe)
            ]
            await Promise.all(promises)
                .then(res => {
                    console.log(res);
                    setCookbook(res[0]);
                    setIng(res[1]); 
                    setInst(res[2]);
                    setLoading(false);
                })
        }
        
        getData()
    }, [])

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
    
    // const recipeSubmit =async (e)=>{
    //     e.preventDefault();
    //     const recipeInfo = [
    //         document.getElementById('recipe_name').value,
    //         document.getElementById('description').value
    //     ];

    //     const instructions = [...document.getElementById('instructions').rows].map((x,i)=>({
    //         stepTitle: getValue(x.cells[0]), 
    //         category: parseInt(getValue(x.cells[1])), 
    //         stepMinutes:parseInt(getValue(x.cells[3])),
    //         description: getValue(x.cells[2]),
    //         stepOrder: i + 1}));
        
    //     const ingredients = [...document.getElementById('ingredients').rows].map((x,i)=>({
    //         ingredientName:getValue(x.cells[0]),
    //         ingredientSizeQty:getValue(x.cells[1]),
    //         ingredientSize:getValue(x.cells[2]) 
    //     }));
        
    //     const _recipe = await new Recipe().add(
    //         document.getElementById('recipe_name').value,
    //         document.getElementById('description').value
    //     );
        
    //     const _inst = await new Instruction().add(instructions,_recipe.id);
        
    //     const _ing = await new Ingredient().add(ingredients,_recipe.id)
        
    //     console.log([_recipe,_inst,_ing]);

    //     window.location.href = `/recipe/${_recipe.id}`;

    // }
    if(loading){
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div>
        <label>Recipe: </label><input type={'text'} id={'recipe_name'}/>
        <label>Headline: </label><input type={'text'} id={'description'}/>
        {/* <div id={'dropzone'}><p>Drop files here...</p></div> */}
        {/* <button >Testing</button> */}
        <h3>Steps</h3>
        <Instructions data={_inst}/>
        <h3>Ingredients</h3>
        <Ingredients data={_ing}/>

        {/* <button onClick={recipeSubmit}>Create Recipe</button>                               */}
        </div>
    )
}