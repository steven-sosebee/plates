import {Ingredient} from "../../classes";

export const IngredientEl = ({ingredient={}})=>{
    // console.log(ingredient);
    const {ingredientName,ingredientSizeQty, ingredientSize, id} = ingredient

    const handleDelete = async (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const res = await new Ingredient().delete(id);
        console.log(res);

    }
    return ( 
        <tr id = {id} draggable={true}>
        <td className = {'text'} contentEditable='true'>{ingredientName? ingredientName: ""}</td>
        <td className = {'text'} contentEditable='true'>{ingredientSizeQty? ingredientSizeQty: ""}</td>
        <td className = {'select'}>
            <select id="measure" defaultValue={ingredientSize}>
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
            <button data-id={id} onClick={handleDelete}>Delete</button>
        </td>
        </tr>
    )
}