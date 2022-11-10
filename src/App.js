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
import { MealAdd } from "./pages/addRecipes";
import { MealList, HomePage } from "./pages";
import { PageDataProvider } from "./context/data";
import { RecipePage } from "./pages/recipe";

function App() {
  return (
    <PageDataProvider>
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
          <Route path="/recipe/:recipe" element={<RecipePage/>}/>
          <Route path="/recipe/" element={<RecipePage/>}/>
        </Routes>
      </Router>
    </PageDataProvider>
  )  
}

export default App;
