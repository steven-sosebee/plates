export const Ingredient = ()=>{

    // return (
    //     <>
    //         <label>Ingredient</label><input id="ingredientName"></input>
    //         <label>Qty</label><input id="qty"></input>
    //         <label>Measure</label>
            // <select id="measure">
            //     <option>Tspn</option>
            //     <option>Tbsp</option>
            //     <option>oz</option>
            //     <option>gram</option>
            //     <option>cup</option>
            // </select>
    //     </>
    // )

    return ( 
        <tr>
        <td className = {'text'} contentEditable='true'></td>
        <td className = {'text'} contentEditable='true'></td>
        <td className = {'select'}>
            <select id="measure">
                <option>Tspn</option>
                <option>Tbsp</option>
                <option>oz</option>
                <option>gram</option>
                <option>cup</option>
                <option>whole</option>
                <option>lb</option>

            </select>
        </td>
        <td className={'noInput'}>
            <button>Test</button>
            <button>Delete</button>
        </td>
        </tr>
    )
}