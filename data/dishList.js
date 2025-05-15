import { recipes, getIngredients } from "../data/recipes.js";
import { loadGrocFromStorage, saveGrocToStorage, grocList, clearGrocList } from "./grocList.js";
import { addIngredient, renderGrocList } from "./grocList.js";
export let dishList;

loadDishFromStorage();

export function loadDishFromStorage() {
    dishList = JSON.parse(localStorage.getItem('dishList'));

    if (!dishList) {
        dishList = [];
    }
}

export function saveDishToStorage() {
    localStorage.setItem('dishList',JSON.stringify(dishList));
}

export function clearDishList() {
    dishList = [];
    saveDishToStorage();
}

export function addDish(dish,index) {

    //const today = dayjs();

    // Check if dish is in the recipe list
    let matchingRecipe;
    let matchingIndex
    recipes.forEach((recipe) => {
        if (recipe.name === dish) {
            matchingRecipe = dish;
            console.log("found")
        }
    })

    if (matchingRecipe) {
        dishList.push({dish,index});
        console.log(dishList);

        saveDishToStorage();

        // Get ingredients
        const ingredients = getIngredients(dish);

        // Add all ingredients to todoList
        ingredients.forEach((ingredient) =>{
            //console.log(ingredient)
            addIngredient(ingredient);
        });

    } else {
        const recipeNameList = getAllRecipeNames();
        alert(`No matching recipe found for ${dish}\n The available recipes are ${recipeNameList}` )
    }

    return matchingRecipe

}

export function removeDish(index) {
    // Get dish from rendered html
    let dish = document.querySelector(`.js-dish-render-${index}`).innerHTML;

    // Remove from render
    document.querySelector(`.js-dish-render-${index}`).innerHTML = ''

    // Remove from list
    const index1 = dishList.indexOf(dish);
    dishList.splice(index1,1);

    saveDishToStorage();
     
    // Also remove ingredients from groc list
    if (dish) {
        let ingredients = getIngredients(dish);

        ingredients.forEach((ingredient) => {
            grocList.forEach((groc,index) => {
                if (groc.name === ingredient.name) {
                    if (groc.quantity > ingredient.quantity) {
                        groc.quantity -= ingredient.quantity;
                    } else {
                        grocList.splice(index, 1);
                    };
                    saveGrocToStorage();
                    renderGrocList();
                };
            });
    
        });
    }

    //
}

export function renderDish(dish,index) {
    document.querySelector(`.js-dish-render-${index}`).innerHTML = dish;
    console.log('dish added');

}

export function renderDishes(dishList,list) {
    list.forEach((index)=> {
        dishList.forEach((item)=>{
            if (item.index === index) {
                document.querySelector(`.js-dish-render-${index}`).innerHTML = item.dish;
            } 
        });
    });
    document.querySelectorAll('.js-')
}