import { loadGrocFromStorage, saveGrocToStorage, grocList, clearGrocList, renderGrocList, addGroc} from "../data/grocList.js";
import { loadDishFromStorage, saveDishToStorage, dishList, clearDishList, addDish, removeDish, renderDish, renderDishes } from "../data/dishList.js";
import { recipes, getIngredients, getAllRecipeNames } from "../data/recipes.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// Load 
loadGrocFromStorage();
loadDishFromStorage();
console.log(dishList);

// Render planning grid
const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
renderPlanningGrid(list);

// Render dates
renderDates(list);

// Render dishes
renderDishes(dishList,list)

// Render
renderGrocList();

function renderPlanningGrid(list) {
    let planningHTML = `<div class="subtitle">Dag</div>
        <div class="subtitle">Gerecht</div>
        <div><button class="clear-all-dish-list js-clear-all-dish-list">Verwijder alle gerechten</button></div>
        <div></div>`

    // Rendering days
    list.forEach((index) => {
        planningHTML += `<div class="js-date-${index}"></div>
                        <div class="js-dish-render-${index}" ></div>
                        <div class="js-dish"></div>
                        <button class="clear-dish js-clear-dish-${index}">x</button>`;
    });

    let inputHTML = '<input type="text" class="js-dish-input">';

    const recipeNameList = getAllRecipeNames();

    /* Drop down menu; how to get selected value
                             
        <select>
        <option selected value="1"></option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>
                        
    */
   
    document.querySelector('.js-planning-grid').innerHTML = planningHTML;
    document.querySelectorAll('.js-dish').forEach((item)=>{
        item.innerHTML = inputHTML;
    })
}

function renderDates(list) {
    const today = dayjs();
    const startDate = today.startOf('week',true)
    const formattedDates = [];
    list.forEach((item) => {
        const nextWeekStart = startDate.add(8+item,'days')
        formattedDates.push(
            nextWeekStart.format(' DD/MM dddd')
        );
        document.querySelector(`.js-date-${item}`).innerHTML = formattedDates[item];
    }); 
}



// Adding a grocery in list
document.querySelector('.js-add-todo-button').addEventListener('click', () => {
    addGroc();
    console.log('push')
});



// Remove all from grocList
document.querySelector('.js-clear-todo-list').addEventListener('click', () => {
    clearGrocList();
    renderGrocList();
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
                        addDish(dish,index);
                        renderDish(dish,index);
                };
            };

            // Make the input block empty
            link.value = '';

        };
    })
});

// Clear the whole dishList
document.querySelector('.js-clear-all-dish-list').addEventListener('click',() => {
    clearDishList();
    console.log(dishList);

    // Generate HTML
    let html = '';
    list.forEach((index)=> {
        //document.querySelector(`.js-dish-render-${index}`).innerHTML = html;
        
        // Remove dish
        removeDish(index);
    });
});

// Remove a rendered dish
list.forEach((index) => {
    document.querySelector(`.js-clear-dish-${index}`).addEventListener('click',()=>{

        // Remove dish
        removeDish(index);

    })
});

