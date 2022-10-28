import "./App.css";
// react methods and objects
import React, { useState, useContext, useEffect } from "react";
// routing and API calls
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Link,
  json,
} from "react-router-dom";
//components
import {Meal, IngredientAdd} from "./components/";
import { dbCall } from "./utils/api";
import { MealAdd, MealList, HomePage } from "./pages";

function App() {
  return (
    <Router>
      <NavLink to={"/list"}>List</NavLink>
      <NavLink to={"/add"}>Add</NavLink>
      <NavLink to={"/ingredient/add"}>Add Ingredient</NavLink>
      <NavLink to={"/recipe/add"}>Add Recipe</NavLink>
    <Routes>
      <Route path="/recipe/add" element={<MealAdd/>}/>
      <Route path="/list" element={<MealList/>}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/ingredient/add" element={<IngredientAdd/>}/>
    </Routes>
      
    </Router>
  )  
}

export default App;
