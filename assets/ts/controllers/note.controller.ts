import { set, keys, get, del } from 'idb-keyval';
import { Note } from "../classes/note";
import { CUSTOM_STORE } from './db.controller';
import { INoteController } from '../helpers/INoteController';

export class NoteController implements INoteController {
    constructor() { }

    saveNote(note: Note) {
        set(note._id, note, CUSTOM_STORE).then(result => console.log(result)).catch(e => console.error(e));
    }

    /**
     * Get ID of keys-value pairs
     */
    async getNotes(): Promise<IDBValidKey[]> {
        return await keys(CUSTOM_STORE)
            .then(r => r)
            .catch(e => { console.error(e); return [] });
    }

    async getIndividualNote(id: string | number): Promise<Note> {
        return await get(id, CUSTOM_STORE)
            .then((r: any) => {
                const note = new Note(r.title, r.content);
                note._id = +id;
                return note;
            });
    }

    async deleteNote(id: string | number) {
        return await del(id, CUSTOM_STORE).then(r => r).catch(e => e);
    }
}