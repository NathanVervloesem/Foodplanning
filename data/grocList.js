export let grocList;

loadGrocFromStorage();

export function loadGrocFromStorage() {
    grocList = JSON.parse(localStorage.getItem('grocList'));

    if (!grocList) {
        grocList = [];
    }
}

export function saveGrocToStorage() {
    localStorage.setItem('grocList',JSON.stringify(grocList));
}

export function clearGrocList(){
    grocList = [];
    saveGrocToStorage();
}

export function addIngredient(ingredient) {

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
                quantity: ingredient.quantity,
                unit: ingredient.unit
            })
    }


    saveGrocToStorage();

    renderGrocList();
}

export function renderGrocList() {
    let todoListHTML = [];

    grocList.forEach((todoObject, index) => {
        //const todoObject = grocList[i];
        const {name, dueDate, quantity, unit} = todoObject;
        let unitString = ''
        if (unit) {
            unitString = '(' + unit + ')'
        }
        const html = 
            `<div>${name} ${unitString}</div>
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
            renderGrocList();
        });
    });
        
    // Plus button
    document.querySelectorAll('.js-plus-button').forEach((plusButton,index) => {
        plusButton.addEventListener('click', ()=> {
            if (grocList[index].quantity >= 100) {
                grocList[index].quantity += 50;
            } else {
                grocList[index].quantity++;
            }
            saveGrocToStorage();
            renderGrocList();
        });
    });

    // Min button
    document.querySelectorAll('.js-min-button').forEach((minButton,index) => {
        minButton.addEventListener('click', ()=>{
            if (grocList[index].quantity > 1) {
                if (grocList[index].quantity >= 100) {
                    grocList[index].quantity -= 10;
                } else {
                    grocList[index].quantity--;
                }
                
            } else {
                grocList.splice(index, 1);
            }
            
            saveGrocToStorage();
            renderGrocList();
        })

    });
    
}

export function addGroc() {
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
                quantity,
            }
        );   
    }

    inputElement.value = '';
    dateInputElement.value = '';
    quantityInputElement.value = '';


    saveGrocToStorage();

    renderGrocList();

}

