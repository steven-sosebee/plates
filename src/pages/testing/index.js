import { useEffect, useRef, useState } from "react";
import ShoppingListItems from "../../classes/shoppingListItem"
import ShoppingList from "../../classes/shoppingList";
import { Recipe } from "../../classes";

export const Testing =() => {
    const listItem = useRef();
    const listId = useRef();
    const [data,setData] = useState([]);
    const [listItems, setListItems] = useState([]);
    const recipeName = useRef();
    const recipeDesc = useRef();

    const testRecipeAdd = async () => {
        const res = await new Recipe().add(
            recipeName.current.value,
            recipeDesc.current.value
        )
        console.log(res);
    }

    const testAdd = async () => {
        console.log(listItem.current.value);
        const items=[
            {
                groceryId:parseInt(listItem.current.value),
                listId:parseInt(listId.current.value)
            }
        ]
        const res = await new ShoppingListItems().add(items);
        console.log(res);
    }

    const testGetListItems = async(e) => {
        console.log(`Getting list ${e.target.getAttribute('data-list-name')}`);
        const items = await new ShoppingListItems().select(e.target.getAttribute('data-list-name'));
        console.log(items);
        if (items.data.length==0){return setListItems("No items found...")}
        setListItems(items.data);

    }
    const testDelete = async (e) => {
        console.log(`Deleting list ${e.target.getAttribute('data-list-name')}`);
        const res = await new ShoppingList().delete(e.target.getAttribute('data-list-name'))
        console.log(res);
        listAll();
    }
    const listAll = async () => {
        const res = await new ShoppingList().list();
        setData(res);
    }
    useEffect(()=>{
        listAll();
    },[])

    const itemList = () => {
        console.log(listItems);
        if (Array.isArray(listItems)){
            return <table>
                {listItems.map(x=>
                    <tr>
                        <td>{x.groceryName}</td>
                    </tr>)}
            </table>
        }
        return <div>{listItems}</div>
    }

    return (
        <div>
            <label>ListItem</label><input ref = {listItem} id="groceryId"></input>
            <label>ListId</label><input ref = {listId} id="listId"></input>

            <button onClick={()=>{testAdd()}}>Test</button>
            <table>
                {data.map(x=>
                    <tr>
                        <td>{x.list_name}</td>
                        <td><button data-list-name = {x.id} id = {x.id} onClick={testDelete}>Delete</button></td>
                        <td><button data-list-name = {x.id} id = {x.id} onClick={testGetListItems}>Select</button></td>
                    </tr>)}
            </table>
            {itemList()}
            <div>
                <h1>Recipe Model Test</h1>
                <label>Recipe Name</label><input ref={recipeName}></input>
                <label>Description</label><input ref={recipeDesc}></input>
                <button onClick={testRecipeAdd}>Recipe</button>
            </div>
        </div>
        
    )
}