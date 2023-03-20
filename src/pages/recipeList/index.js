import { useContext, useEffect, useRef, useState } from "react";
import { Meal } from "./meal";
// import { PageDataProvider, usePageDataContext } from "../../context/data";
import { dateCurrTS } from "../../utils";
import { dbCall } from "../../utils/api";
import "../../style/index.css";
import { Recipe } from "../../classes";

export const MealList =()=>{
  let fetchData;
  const [phpRes, setPHPRes] = useState();
  const [meals, setMeals] = useState([]);
  // const {pageData,setPageData}=usePageDataContext();
  
  const listAll = async () => {
    const res = await new Recipe().list();
    console.log(res);
    setMeals(res.data);
  }

  useEffect(()=>{
    listAll();
  },[])

  const handleDelete= async (e)=>{
    const _list = [...meals];
    const idx = _list.findIndex(x=>x.id==e.target.id);
    _list.splice(idx,1);
    setMeals(_list);
    e.preventDefault();
    console.log(parseInt(e.target.id));
    const res = await new Recipe().delete(parseInt(e.target.id));
    console.log(res);
  };

  return (
    <>
    <ul>
      {meals.map(x=>(
        <li><Meal meal={x}/><button id={x.id} onClick={handleDelete}>Delete</button></li>
      ))}
    </ul>
    <div className="flex">
    </div>
    </>
  );
}