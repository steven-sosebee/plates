import { useContext, useEffect, useRef, useState } from "react";
import { Meal } from "../components";
import { PageDataProvider, usePageDataContext } from "../context/data";
import { dateCurrTS } from "../utils";
import { dbCall } from "../utils/api";
import "../style/index.css";


const Step =({step, add})=>{
  const v = useRef();

  return (<><input ref={v} placeholder={step}/><button>Delete</button></>)
}

const Steps =()=>{
  const {pageData,setPageData}=usePageDataContext();
  useEffect(()=>{
    console.log(pageData);},[pageData]);
  
  const addStep =(e)=>{
    let _steps=[...pageData.steps,''];
    // const newStep=e.target.parentNode.querySelector('input');
    // console.log(_steps);
    let _data= {...pageData,};
    _data.steps=_steps;
    setPageData(_data);  
    // console.log(newStep);
  }
  return (<div>
      {pageData.steps.map((step=>(<Step add={addStep} step={step}/>)))}
      <button onClick={addStep}>Add Step +</button>
  </div>)
};

export const MealList =()=>{
  let fetchData;
  const [phpRes, setPHPRes] = useState();
  const [meals, setMeals] = useState([]);
  const {pageData,setPageData}=usePageDataContext();
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

  const submit =()=>{
    
    const _steps = [...document.querySelectorAll('input')];
    let x =_steps.map(step=>(
      step.value
    ))
    let _pageData={...pageData};
    _pageData.steps=x;
    const body={
      recipeId:pageData.activeMeal.recipeId,
      steps:x,
      category:1
    };
    const headers={
      class:'Step',
      action:'add'
    }
    dbCall(body, headers)
    // setPageData(_pageData);
    //console.log(x);
  }  
  
  return (
    <>
    <ul>
      {meals.map(x=>(
        <Meal meal={x}/>
      ))}
    </ul>
    <div className="flex">
        <Steps/>
    </div>
    <button onClick={submit}>Submit</button>
    </>
  );
}