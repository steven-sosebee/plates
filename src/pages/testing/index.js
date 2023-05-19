import { useEffect, useRef, useState } from "react";
import ShoppingListItems from "../../classes/shoppingListItem"
import ShoppingList from "../../classes/shoppingList";
import { Recipe } from "../../classes";
import Grocery2 from "../../classes/grocery2";

export const Testing =() => {
    const listItem = useRef();
    const listId = useRef();
    const [data,setData] = useState([]);
    const [listItems, setListItems] = useState([]);
    const recipeName = useRef();
    const recipeDesc = useRef();
    const emailSubject = useRef();
    const emailMessage = useRef();
    const [ep,setEP] = useState();
    const [a, setAuth] = useState();
    const [dh,setDH] = useState();
    const [pnData,setPN] = useState();
    const [status, setStatus] = useState();
    const pnTest = async() => {
        let data = {};
        data.bAvailable = {
            serviceworker:('serviceWorker' in navigator), 
            pushManager: ('PushManager' in window),
            Notification: ('Notification' in window)
        };
        const sw = await navigator.serviceWorker.ready;
        data.swReady = sw;
        data.permission = window.Notification.permission;
        // JSON.stringify(data);
        setPN(JSON.stringify(data));
    }
    const pnAccept = async () =>{
        // await window.Notification.requestPermission();
        alert("Push turned on");
    }
    function pnAvailable() {
        var bAvailable = false;
        if (window.isSecureContext) {
            // running in secure context - check for available Push-API
            bAvailable = (('serviceWorker' in navigator) && 
                          ('PushManager' in window) && 
                          ('Notification' in window)); 
            console.log(`bAvailable - ${bAvailable}`)
        } else {
            console.log('site have to run in secure context!');
        }
        alert(`Push is available: ${bAvailable}`)
        return bAvailable;
      }

    const pnUnsubscribe =async () => {
        const sw = await navigator.serviceWorker.ready;
        const sub = await sw.pushManager.getSubscription()
        
        sub.unsubscribe()
        console.log(sub);
    };

    const pnGetSubcription = async () => {

        const sw = await navigator.serviceWorker.ready;
        const sub = await sw.pushManager.getSubscription();
        // const key = sub.getKey("p256dh");
        // const auth = sub.getKey("auth");
      
        // console.log(key);
        // console.log(auth);
        const keys = sub.toJSON();
        const body = {        
            endpoint: keys.endpoint,
            auth: keys.keys.auth,
            p256dh:keys.keys.p256dh
        }
        setEP(keys.endpoint);
        setAuth(keys.keys.auth);
        setDH(keys.keys.p256dh);

        const push = await fetch("/php/test/sub.php",
            {
                "method":"POST",
                "body":JSON.stringify(body)
            });
        const response = await push.json();
        if (push.ok){
            console.log(response)
            console.log(push);
        } else {
            console.log(push.status);

        }
      }

    const pnSubscribe= async () => {
        setStatus('checking if available...');
        if (pnAvailable()) {
            // if not granted or denied so far...
            if (window.Notification.permission === 'default') {
                await window.Notification.requestPermission();
            }
            if (Notification.permission === 'granted') {
                // register service worker
                setStatus('is serviceWorker ready...');
                  const sw = await navigator.serviceWorker.ready;
                  setStatus('serviceWorker ready...');
                  const options = {
                    userVisibleOnly: true,
                    applicationServerKey:"BKCkVGJHHcFpk1yQ6myzQWlSbBZ1-iyxTIsfkMczdD3jlnlr8FDA__W8YSkELh-3W_zR2yzue3cSV7J3FjASzMU"
                    }
                    setStatus('subscribing...');
                    const sub = await sw.pushManager.subscribe(options);
                    setStatus('subscription ready...');
                    const keys = sub.toJSON();
                    const body = {        
                        endpoint: keys.endpoint,
                        auth: keys.keys.auth,
                        p256dh:keys.keys.p256dh
                    }
                    setEP(keys.endpoint);
                    setAuth(keys.keys.auth);
                    setDH(keys.keys.p256dh);
                            }
                        }
                    }
      
      
    const sendMail = async() => {

        
        const res = await fetch(
            `/php/models/eMail.php?subject=${emailSubject.current.value}&message=${emailMessage.current.value}`
        )
        .then(res=>res.json())
        .then(data=>{return data})
        .catch(error=>{return error})

        console.log(res);
    }
    const testRecipeAdd = async () => {
        const recipes = [
            {
                name: recipeName.current.value,
                description: recipeDesc.current.value
            },
            {
                name: `${recipeName.current.value} - new`,
                description: recipeDesc.current.value
            }
        ]
        
        const res = await new Recipe().add(
        recipes
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

    const testGetList = async(e) => {
        const res = await new Recipe().list();
        console.log(res);
    }
    const testSelect = async(e) => {
        const res = await new Recipe().list(101);
        console.log(res);
    }

    const testDelete = async(e) => {
        const res = await new Recipe().delete(recipeName.current.value);
        console.log(res);
    }
    // const testDelete = async (e) => {
    //     console.log(`Deleting list ${e.target.getAttribute('data-list-name')}`);
    //     const res = await new ShoppingList().delete(e.target.getAttribute('data-list-name'))
    //     console.log(res);
    //     listAll();
    // }
    const listAll = async () => {
        const res = await new ShoppingList().list();
        setData(res);
    }

    const newConn = async () => {
        const res = await new Grocery2().test();
        console.log(res);
    }
    useEffect(()=>{
        // listAll();
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
            <div>
                <button onClick={pnTest}>Testing PN</button>
                <p>{pnData}</p>
            </div>
            <button onClick={pnAccept}>Accept Notifications</button>
            <button onClick={pnSubscribe}>Subscribe</button>
            <button onClick={pnUnsubscribe}>Unsubscribe</button>
            <button onClick={pnGetSubcription}>Get Subscription</button>

            <p>{ep}</p>
            <p>{a}</p>
            <p>{dh}</p>
            {/* <label>ListItem</label><input ref = {listItem} id="groceryId"></input>
            <label>ListId</label><input ref = {listId} id="listId"></input>

            <button onClick={()=>{testAdd()}}>Test</button>
            <button onClick={()=>{newConn()}}>New Conn Test</button>
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
                <button onClick={testSelect}>Get Recipe</button>
                <button onClick={testGetList}>Get List</button>
                <button onClick={testDelete}>Delete Recipe</button>
            </div>
            <div>
                <input ref={emailSubject}/>
                <input ref={emailMessage}/>
                <button onClick={sendMail}>Send Mail</button>
            </div> */}
        </div>
        
    )
}