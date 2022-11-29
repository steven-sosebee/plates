export const Ingredient = ({ingredient={}})=>{
    const {ingredientName,ingredientSizeQty, ingredientSize} = ingredient
    return ( 
        <tr>
        <td className = {'text'} contentEditable='true'>{ingredientName}</td>
        <td className = {'text'} contentEditable='true'>{ingredientSizeQty}</td>
        <td className = {'select'}>
            <select id="measure">
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