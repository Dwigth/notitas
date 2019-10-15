import * as Collections from 'typescript-collections';
export class Note {
    constructor(public title: string, public content: string) { }
    toString() {
        return Collections.util.makeString(this);
    }
}