import { Store } from 'idb-keyval';

// DECLARACIÓN GLOBAL DE LA BASE DE DATOS
export let CUSTOM_STORE: Store;


export class DBController {
    constructor() {
        CUSTOM_STORE = new Store('notitas', 'notas');
        CUSTOM_STORE._dbp.then(r => console.log(r)).catch(e => console.error(e))
    }
}