import { useEffect, useRef, useState } from "react"
import Grocery from "../../classes/grocery"
import { Table } from "../../components"
import { clearForm, dbCall } from "../../utils"

export const AddGrocery = () => {
    const newGroceryName = useRef();
    const newGroceryPrice = useRef();
    const newGroceryMeasure = useRef();

    const [groceryList,setGroceryList] = useState([]);
    
    const load = async () => {
        const res = await new Grocery().list();
        // console.log(res[0]);
        setGroceryList(res);
    }
    


    useEffect(()=>{
        load()

    },[]);

    const deleteGrocery = async (id) => {
        const res = await new Grocery().delete(id);
        console.log(res);
        const idx = groceryList.findIndex((x)=>x.id===id)
        console.log(idx);
        let _groceryList = [...groceryList];
        _groceryList.splice(idx,1);
        console.log(_groceryList);
        setGroceryList(_groceryList);
    }
    const addGrocery = async () => {
        // console.log(groceryName.current.value);
        const newGrocery = {
            groceryName:newGroceryName.current.value,
            groceryPrice: newGroceryPrice.current.value,
            groceryMeasure: newGroceryMeasure.current.value
        }
        try{
            // console.log(newGrocery);
            const res = await new Grocery().add([newGrocery]);
            // console.log(res);
            setGroceryList([...groceryList,newGrocery]);
            clearForm();
        } catch(err){
            window.alert(err);
        }

    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><label>Grocery:</label></td>
                        <td><input ref={newGroceryName} id={'grocery'}/></td>
                    </tr>
                    <tr>
                        <td><label>Price:</label></td>
                        <td><input ref={newGroceryPrice} id={'grocery'}/></td>
                    </tr>
                    <tr>
                        <td><label>Size:</label></td>
                        <td><input ref={newGroceryMeasure} id={'grocery'}/></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addGrocery}>Add</button>
            
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {groceryList.map(grocery => (<tr key={grocery.id}>
                        <td>{grocery.groceryName}</td>
                        {/* <td></td> */}
                        <td>{grocery.groceryPrice}</td>
                        <td>{grocery.groceryMeasure}</td>
                        <td><button onClick={()=>deleteGrocery(grocery.id)}>x</button></td>
                    </tr>))}
                </tbody>
            </table>
            {/* <Table headers={["Name", 'Price', 'Size']} data={[['peas',1,'bag'], ['carrots',2,'bag']]}/> */}
            
        </div>
    )
}