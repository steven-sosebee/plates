import { Recipe } from "../../classes";
import { usePageDataContext } from "../../context/data";
import { dbCall } from "../../utils";

export const Meal =({meal, returnData})=>{
    // const {pageData,setPageData}=usePageDataContext();

    let headers={
        class:'Recipe'
    };

    
    const handleDelete= async (e)=>{
        e.preventDefault();
        console.log(parseInt(e.target.id));
        const res = await new Recipe().delete(parseInt(e.target.id));
        console.log(res);
    };

    return (
        <li id={meal.recipeId} key={meal.recipeId}>
            <a href={`/recipe/${meal.recipeId}`}>{meal.recipe_name} - uploaded at: {meal.created_at}</a>
        </li>
    )
}