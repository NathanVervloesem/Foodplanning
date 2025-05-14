import { recipes, getIngredients } from "../data/recipes.js";
import { loadGrocFromStorage, saveGrocToStorage, grocList, clearGrocList } from "./grocList.js";
import { renderTodoList } from "../scripts/12-todo-list.js";
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
                    renderTodoList();
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