import * as Collections from 'typescript-collections';
import { INote } from '../helpers/INote';

export class Note implements INote {

    public _id = new Date().getTime();
    constructor(public title: string, public content: string) { }

    toString() {
        return Collections.util.makeString(this);
    }
}