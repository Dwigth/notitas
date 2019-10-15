import PouchDB from 'pouchdb-browser';

// DECLARACIÓN GLOBAL DE LA BASE DE DATOS
export let DATABASE: PouchDB.Database;

export class DBController {
    constructor() {
        DATABASE = new PouchDB('notitas');
    }

    async getNotes(): Promise<any> {
        return await DATABASE.allDocs(
            {
                include_docs: true,
                attachments: true
            }).then(r => r).catch(e => console.error(e));
    }
}