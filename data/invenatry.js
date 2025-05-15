export let invList;

loadInvFromStroage();

export function loadInvFromStroage() {
    invList = JSON.parse(localStorage.getItem('invList'));

    if (!invList) {
        invList = [];
    }
}
export function saveInvToStorage() {
    localStorage.setItem('invList',JSON.stringify(invList));
}

export function clearInvList() {
    invList = [];
    saveInvToStorage();
}