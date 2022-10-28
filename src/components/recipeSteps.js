export const RecipeSteps =(props)=>{
    const {mealId, steps}=props;
    return (<div>
        <input placeholder="step..."/>
        <button>Delete</button>
        <button>Add</button>
    </div>)
}