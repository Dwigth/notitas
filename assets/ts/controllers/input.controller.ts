import anime from 'animejs';
import { DATABASE, DBController } from './db.controller';
import { Note } from '../classes/note';
import { Dictionary } from 'typescript-collections';

export class InputController {

    constructor() {
        this.ExpandTextArea();
        this.showNotes();
        this.closeNotes();
    }

    private ExpandTextArea() {
        const contenido = <HTMLTextAreaElement>document.getElementById('content');
        contenido.addEventListener('keyup', (evt) => {
            let oField = contenido;
            if (oField.scrollHeight > oField.clientHeight) {
                oField.style.height = oField.scrollHeight + "px";
            }
            if (evt.key == 'Enter') {

                const note = new Note('', contenido.value);
                console.log(note.toString());

                DATABASE.post(note).then(result => console.log(result)).catch(e => console.error(e));
                contenido.value = '';
            }
        });
    }
    private showNotes() {
        // Validación para saber si tiene notas
        // Declaración de variables al principio de la función
        const list = <HTMLElement>document.getElementById('list');
        const db = new DBController();
        const notesBtn = <HTMLButtonElement>document.getElementById('notes');
        notesBtn.addEventListener('click', async () => {
            list.innerHTML = '';
            anime({
                targets: '.notitas',
                opacity: '1',
                easing: 'linear',
                zIndex: '2'
            });
            // Agregar a la lista
            const notes = await db.getNotes();
            notes.rows.forEach((row: any) => {
                const note = new Note(row.doc.title, row.doc.content);
                console.log(note.toString());
                const li = document.createElement('li');
                li.textContent = row.doc.content;
                list.appendChild(li);
            });

        });
    }

    private closeNotes() {
        const closeNotesBtn = <HTMLButtonElement>document.getElementById('close');
        closeNotesBtn.addEventListener('click', async () => {
            anime({
                targets: '.notitas',
                easing: 'linear',
                opacity: '0',
                zIndex: '0'
            });
        });
    }
}