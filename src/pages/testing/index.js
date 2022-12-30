import { useRef } from "react";
import ShoppingListItems from "../../classes/shoppingListItem"

export const Testing =() => {
    const groceryId = useRef();
    const listId = useRef();

    const testAdd = async () => {
        console.log(groceryId.current.value);
        const res = await new ShoppingListItems().testing(groceryId.current.value, listId.current.value);
        console.log(res);
    }

    return (
        <div>
            <input ref = {groceryId} id="groceryId"></input>
            <input ref = {listId} id="listId"></input>

            <button onClick={()=>{testAdd()}}>Test</button>
        </div>
    )
}