import { Recipe } from "../../classes";
import { usePageDataContext } from "../../context/data";
import { dbCall } from "../../utils";

export const Meal =({meal, returnData})=>{
    const {pageData,setPageData}=usePageDataContext();

    let headers={
        class:'Recipe'
    };

    const selectMeal =(e)=>{
        let body={
            id:e.target.id
        }
        headers.action='select';
        dbCall(body,headers)
        .then(res=>{
            let activeMeal=res[0];
            console.log(activeMeal);
            activeMeal.recipe_name=`${activeMeal?.recipe_name} - new`;
            const _pageData= {...pageData};
            _pageData.activeMeal=activeMeal;
            console.log(_pageData);
            setPageData(_pageData)});
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
            
            {/* <a href={`/?recipe=${meal.recipeId}`}>{meal.recipe_name} - uploaded at: {meal.created_at}</a> */}
        </li>
    )
    // return (
    //     <li onClick={(e)=>{selectMeal(e)}}id={meal.recipeId} key={meal.recipeId}>
    //         {meal.recipe_name} - uploaded at: {meal.created_at}
    //     </li>
    // )
}