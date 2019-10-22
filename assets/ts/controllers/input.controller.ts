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
    TextArea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('content');
    //ContextMenu
    menu: HTMLElement = <HTMLElement>document.querySelector(".menu");
    // Propiedades del ContextMenu
    menuIsVisible = false;

    constructor() {
        this.NoteController = new NoteController();
        this.ExpandTextArea();
        this.showNotes();
        this.closeNotes();
        this.renderContextMenu();
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
            // console.log(notes);

            notes.forEach(async (id: any) => {
                const data = await this.NoteController.getIndividualNote(id);
                // console.log(data);
                const note = new Note(data.title, data.content);
                note._id = data._id;
                const li = document.createElement('li');
                li.classList.add(note._id.toString());
                li.dataset.dataEditing = 'false';
                li.addEventListener('click', () => this.editNote(note, li));
                this.hold(note, li);
                li.textContent = data.content;
                list.appendChild(li);
            });

        });
    }

    /**
     * Metodo para obtener el tiempo en el que mantiene presionado un elemento.
     * @param el Elemento al que se le aplica la función
     */
    private hold(note: Note, el: HTMLElement) {
        let holdTime = 0;
        let intervalTime: any;

        el.addEventListener('mousedown', () => {
            intervalTime = setInterval(() => {
                holdTime++;
            }, 1000);
        });
        el.addEventListener('mouseup', () => {
            clearInterval(intervalTime);
            console.log('Tiempo sostenido: ' + holdTime);

            if (holdTime > 1) {
                holdTime = 0;
                let target = '.' + note._id.toString();
                console.log(target);

                anime({
                    targets: target,
                    backgroundColor: '#e62222'
                });
                if (confirm('¿Estás seguro que deseas eliminar la nota?')) {
                    this.NoteController.deleteNote(note._id);
                }
            }
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

    private renderContextMenu() {

        const toggleMenu = (command: any) => {
            this.menu.style.display = command === "show" ? "block" : "none";
        };
        type position = { top: number, left: number };
        const setPosition = ({ top, left }: position) => {
            this.menu.style.left = `${left}px`;
            this.menu.style.top = `${top}px`;
            toggleMenu('show');
        };

        window.addEventListener("click", e => {
            this.menuIsVisible = true;
            if (this.menuIsVisible) toggleMenu("hide");
        });

        window.addEventListener("contextmenu", e => {
            e.preventDefault();
            const origin = {
                left: e.pageX,
                top: e.pageY
            };
            setPosition(origin);
            return false;
        });
    }
}