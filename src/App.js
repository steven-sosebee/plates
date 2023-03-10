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
import { MealList, HomePage, AddGrocery, Testing, Styles } from "./pages";
import { PageDataProvider } from "./context/data";
import { RecipePage } from "./pages/recipe";
import { RecipeEdit } from "./pages/editRecipe";
import { DnDProvider, DragNDropContext } from "./context/drag-n-drop";
import { ShoppingList } from "./pages/shoppingList";

function App() {
  return (
    <DnDProvider>
      <Router>
        <NavLink to={"/list"}>List</NavLink>
        <NavLink to={"/add"}>Add</NavLink>
        <NavLink to={"/ingredient/add"}>Add Ingredient</NavLink>
        <NavLink to={"/recipe/add"}>Add Recipe</NavLink>
        <NavLink to={"/groceries/add"}>Add Groceries</NavLink>
        <NavLink to={"/shoppingList"}>Shopping List</NavLink>
        <Routes>
          <Route path="/recipe/add" element={<MealAdd/>}/>
          <Route path="/shoppingList" element={<ShoppingList/>}/>
          <Route path="/list" element={<MealList/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/groceries/add" element={<AddGrocery/>}/>
          <Route path="/styles" element={<Styles/>}/>
          {/* <Route path="/ingredient/add" element={<IngredientAdd/>}/> */}
          <Route path="/recipe/:recipe" element={<RecipePage/>}/>
          <Route path="/recipe/" element={<RecipePage/>}/>
          <Route path="/recipe/edit/:recipe" element={<RecipeEdit/>}/>
          <Route path="/testing" element={<Testing/>}/>
        </Routes>
      </Router>
    </DnDProvider>
  )  
}

export default App;
