import { useEffect, useState } from "react"
import { Grocery } from "../../classes";
import { listRemove } from "../../utils/interfaces";

export const ShoppingList = () => {
    const [shoppingList,setShoppingList] = useState([]);
    const [groceryList, setGroceryList] = useState([])
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try{
            const res = await new Grocery().list();
            // console.log(res[0]);
            setGroceryList(res);
            setLoading(false);
            // return res;
        } 
        catch(err){
            return err;
        }
    }
    
    const addShopping = (grocery) => {
        setShoppingList([...shoppingList, grocery]);
        const _groceryList = [...groceryList];
        const test = listRemove(grocery,groceryList,grocery.id);
        setGroceryList(test);

    }
    useEffect(() => {
        load();
        
    },[])
    if (loading){
        return (
            <div>
                <h1>loading</h1>
            </div>
        )
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Grocery</th>
                    </tr>
                </thead>
                <tbody>
                    {groceryList.map(grocery => (<tr key={grocery.id}>
                        <td>{grocery.groceryName}</td>
                        {/* <td></td> */}
                        <td>{grocery.groceryPrice}</td>
                        <td>{grocery.groceryMeasure}</td>
                        <td><button onClick={()=>addShopping(grocery)}>+</button></td>
                    </tr>))}
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Need</th>
                    </tr>
                </thead>
                <tbody>
                    {shoppingList.map(x=>(
                        <tr key={x.id}>
                            <td>{x.groceryName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}