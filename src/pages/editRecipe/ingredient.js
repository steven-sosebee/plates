export const Ingredient = ({ingredient={}})=>{
    // console.log(ingredient);
    const {ingredientName,ingredientSizeQty, ingredientSize} = ingredient
    return ( 
        <tr draggable={true}>
        <td className = {'text'} contentEditable='true'>{ingredientName}</td>
        <td className = {'text'} contentEditable='true'>{ingredientSizeQty}</td>
        <td className = {'select'}>
            <select id="measure" value={ingredientSize}>
                <option>Tspn</option>
                <option>Tbsp</option>
                <option>oz</option>
                <option>gram</option>
                <option>cup</option>
                <option>whole</option>
                <option>lb</option>
                <option>mL</option>

            </select>
        </td>
        <td className={'noInput'}>
            <button>Test</button>
            <button>Delete</button>
        </td>
        </tr>
    )
}