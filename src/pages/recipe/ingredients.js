export const Ingredients = ({ingredients})=>{
    
    if (!Array.isArray(ingredients)){
        return (
            <div>
                <p>No instructions found...</p>
            </div>
        )
    }
    return (
        <ul>
            {ingredients.map(ingredient=>(
                <li><p>{ingredient.ingredientName}</p></li>
            ))}
        </ul>
    )
}