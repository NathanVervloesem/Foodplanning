import { loadGrocFromStorage, saveGrocToStorage, grocList, clearGrocList } from "../data/grocList.js";
import { loadDishFromStorage, saveDishToStorage, dishList, clearDishList, removeDish, renderDish } from "../data/dishList.js";
import { recipes, getIngredients, getAllRecipeNames } from "../data/recipes.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// Load 
loadGrocFromStorage();
loadDishFromStorage();

// Render dates
renderDates();

// Render
renderTodoList();

function renderDates() {
    const today = dayjs();
    const startDate = today.startOf('week',true)

    const list = [0, 1, 2, 3, 4, 5, 6];
    const formattedDates = [];
    list.forEach((item) => {
        const nextWeekStart = startDate.add(8+item,'days')
        formattedDates.push(
            nextWeekStart.format(' DD/MM dddd')
        );
        document.querySelector(`.js-date-${item}`).innerHTML = formattedDates[item];
    }); 
}

export function renderTodoList() {
    let todoListHTML = [];

    grocList.forEach((todoObject, index) => {
        //const todoObject = grocList[i];
        const {name, dueDate, quantity} = todoObject;
        const html = 
            `<div>${name}</div>
            <div>${quantity}</div>
            <div>${dueDate}</div>
            <button class="delete-todo-button js-delete-todo-button">Verwijder</button>
            <button class="plus-button js-plus-button">+</button>
            <button class="min-button js-min-button">-</button>`;
        todoListHTML += html;
    });

    //console.log(todoListHTML);
    
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;    

    // Delete groc button
    document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            grocList.splice(index, 1);
            saveGrocToStorage();
            renderTodoList();
        });
    });
        
    // Plus button
    document.querySelectorAll('.js-plus-button').forEach((plusButton,index) => {
        plusButton.addEventListener('click', ()=> {
            grocList[index].quantity++;
            saveGrocToStorage();
            renderTodoList();
        });
    });

    // Min button
    document.querySelectorAll('.js-min-button').forEach((minButton,index) => {
        minButton.addEventListener('click', ()=>{
            if (grocList[index].quantity > 1) {
                grocList[index].quantity--;
            } else {
                grocList.splice(index, 1);
            }
            
            saveGrocToStorage();
            renderTodoList();
        })

    });
    
}

// Adding a grocery in list
document.querySelector('.js-add-todo-button').addEventListener('click', () => {
    addTodo();
    console.log('push')
});

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name =  inputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    const quantityInputElement = document.querySelector('.js-quantity-input');
    const quantity = Number(quantityInputElement.value);
    
    /*
    todoList.push({
        name: name,
        dueDate: dueDate});
    */
    let matchingGroc
    grocList.forEach((groc,index) => {
        if (groc.name === name) {
            matchingGroc = groc.name;
            groc.quantity += quantity;


            // Remove from list if quantity is zero or lower    
            if (groc.quantity < 1) {
                grocList.splice(index,1);
            }
        }
    })
    if (!matchingGroc) {
        grocList.push(
            {
                name,
                dueDate,
                quantity
            }
        );   
    }

    inputElement.value = '';

    saveGrocToStorage();

    renderTodoList();

}

function addIngredient(ingredient) {

    let matchingIngredient
    grocList.forEach((groc) => {
        // Find matching item
        if (groc.name === ingredient.name) {
            matchingIngredient = groc.name;
            groc.quantity += ingredient.quantity;
        } 
    })
    if (!matchingIngredient) {
        grocList.push(
            {
                name: ingredient.name,
                dueDate:'',
                quantity: ingredient.quantity
            })
    }


    saveGrocToStorage();

    renderTodoList();
}

// Remove all from grocList
document.querySelector('.js-clear-todo-list').addEventListener('click', () => {
    clearGrocList();
    renderTodoList();

})

// Adding a dish by Enter dish
document.querySelectorAll('.js-dish-input').forEach((link,index)=> {
    //console.log(link)
    link.addEventListener('keypress', (e) => {
        if (e.key === 'Enter'){
            // Only add when there is no dish yet for that day
            let dishPrev = document.querySelector(`.js-dish-render-${index}`).innerHTML
            const dish = link.value.toLowerCase();
            if (dish) {
                if (!dishPrev) {
                    //console.log('not previous dish')
                    let matchingItem = addDish(dish,index);

                    if (matchingItem) {
                        renderDish(dish,index);
                    }
                   
                } else if (dishPrev !== dish) {
                        // Overwrite the dish
                        console.log('overwriting dish')
                        removeDish(index);
                        addDish(dish);
                        renderDish(dish,index);
                };
            };

            // Make the input block empty
            link.value = '';

        };
    })
});


function addDish(dish) {

    //const today = dayjs();

    // Check if dish is in the recipe list
    let matchingRecipe;
    recipes.forEach((recipe) => {
        if (recipe.name === dish) {
            matchingRecipe = dish;
            console.log("found")
        }
    })

    if (matchingRecipe) {
        dishList.push(dish);
        //console.log(dishList);

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

// Clear the whole dishList
document.querySelector('.js-clear-all-dish-list').addEventListener('click',() => {
    clearDishList();
    console.log(dishList);

    // Generate HTML
    let html = '';
    const list = [0, 1, 2, 3, 4, 5, 6];
    list.forEach((index)=> {
        //document.querySelector(`.js-dish-render-${index}`).innerHTML = html;
        
        // Remove dish
        removeDish(index);
    });
});

// Remove a rendered dish
const list = [0, 1, 2, 3, 4, 5, 6];
list.forEach((index) => {
    document.querySelector(`.js-clear-dish-${index}`).addEventListener('click',()=>{

        // Remove dish
        removeDish(index);

    })
});

