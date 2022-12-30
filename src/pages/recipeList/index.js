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
  
  useEffect(()=>{
    const _headers = {
      class:'Recipe',
      action:'list'
    }
    dbCall([],_headers)
    .then(fetchData =>{
      setMeals(fetchData);
    })
  },[])

  // const submit =()=>{
    
  //   const _steps = [...document.querySelectorAll('input')];
  //   let x =_steps.map(step=>(
  //     step.value
  //   ))
  //   let _pageData={...pageData};
  //   _pageData.steps=x;
  //   const body={
  //     recipeId:pageData.activeMeal.recipeId,
  //     steps:x,
  //     category:1
  //   };
  //   const headers={
  //     class:'Step',
  //     action:'add'
  //   }
  //   dbCall(body, headers)
  //   // setPageData(_pageData);
  //   //console.log(x);
  // }  
  
  const handleDelete= async (e)=>{
    const _list = [...meals];
    const idx = _list.findIndex(x=>x.recipeId==e.target.id);
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
        <li><Meal meal={x}/><button id={x.recipeId} onClick={handleDelete}>Delete</button></li>
      ))}
    </ul>
    <div className="flex">
    </div>
    </>
  );
}