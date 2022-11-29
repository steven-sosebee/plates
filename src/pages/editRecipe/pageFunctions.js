// import { dateCurrTS, dbCall } from "../../utils";



// export class Recipe {
//     constructor() {
//         this.TS = dateCurrTS();
//         this.class = 'Recipe';
//     }

//     async add(recipeName, headline){
//         this.userId = 1;
//         this.recipe_name = recipeName;
//         this.description = headline;
//         this.dbFormat = {
//             recipe_name: this.recipe_name,
//             description: this.description,
//             userId: this.userId,
//             created_at: this.TS,
//             updated_at:this.TS
//         }

//         const headers = {
//             class: this.class,
//             action:'add'
//         }
//         return dbCall(this.dbFormat,headers)
//             .then(res=>{
//                 console.log(res)
//                 return res})
//             .catch(err=>console.log(err))

//     }

//     delete(){

//     }

//     edit(){
//         return this.details
//     }
// }

// export class Ingredient {
//     constructor(){
//         // this.ingredientName = ingredient;
//         // this.qty = qty;
//         // this.measure = measure;
//         this.class = 'Ingredient'
//     }
//     refresh(){
//             dbCall([],{class:"Ingredient",action:'list'})
//             .then(data=>{return data})
//     }
//     add(ingredient, qty, measure, recipeId){               
//         const body = {
//             ingredientName:ingredient,
//             ingredientSizeQty:qty,
//             ingredientSize:measure,
//             recipeId:recipeId
//         }
//         const headers = {
//             class:this.class,
//             action:"add"
//         }

//         dbCall(body,headers)
//         .then(data=>{return data})
//         .catch(err=>console.log(err));

//     }
//     delete(){
//         const handleDelete =(e)=>{
//             const deleteItem = {ingredientsId:e.target.id};
//             dbCall(deleteItem,{class:'Ingredient',action:'delete'})
//             .then(refresh());
//         }
//     }
// }

// export class Step {
//     constructor(){
//         this.class = "Step";
//     }
//     add(){
        
//     }
// }