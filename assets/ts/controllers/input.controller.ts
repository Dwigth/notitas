import anime from 'animejs';
import { NoteController } from './note.controller';
import { Note } from '../classes/note';
import { Dictionary } from 'typescript-collections';
import { INoteController } from '../helpers/INoteController';

export class InputController {

    // Estado del controlador
    editing = false;
    // Controlador de notas
    NoteController: INoteController;
    // Tamaño del TextArea
    TextAreaInitialHeigth: any;
    //TextArea
    TextArea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('content');;

    constructor() {
        this.NoteController = new NoteController();
        this.ExpandTextArea();
        this.showNotes();
        this.closeNotes();
    }

    private ExpandTextArea() {
        const contenido = this.TextArea;
        this.TextAreaInitialHeigth = contenido.style.height;

        contenido.addEventListener('keyup', (evt) => {
            let oField = contenido;
            if (oField.scrollHeight > oField.clientHeight) {
                oField.style.height = oField.scrollHeight + "px";
            }
            if (evt.key == 'Enter') {

                const note = new Note('', contenido.value);
                console.log(note.toString());
                this.TextArea.style.height = this.TextAreaInitialHeigth;
                this.NoteController.saveNote(note);
                contenido.value = '';
            }
        });
    }
    private showNotes() {
        // Validación para saber si tiene notas
        // Declaración de variables al principio de la función
        const list = <HTMLElement>document.getElementById('list');
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
            const notes = await this.NoteController.getNotes();
            console.log(notes);

            notes.forEach(async (id: any) => {
                const data = await this.NoteController.getIndividualNote(id);
                console.log(data);
                const note = new Note(data.title, data.content);
                note._id = data._id;
                const li = document.createElement('li');
                li.dataset.dataEditing = 'false';
                li.addEventListener('click', () => this.editNote(note, li));
                li.textContent = data.content;
                list.appendChild(li);
            });

        });
    }

    /**
     * Funcionalidad para editar la nota
     * @param note Nota a editar
     */
    private editNote(note: Note, el: HTMLElement) {
        el.contentEditable = 'true';
        el.addEventListener('keydown', (evt) => {
            if (evt.key === 'Enter') {
                el.contentEditable = 'false';
                if (el.textContent != null)
                    note.content = el.textContent;
                this.NoteController.saveNote(note);
            }
        })
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