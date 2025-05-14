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

