import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[shortCutKey]'
})
export class ShortCutKeyDirective {

    constructor() {
    }


    // close form dialog if exists on window Esc key press
    @HostListener('document:keydown.escape', ['$event'])
    handleEscapeKey(event: KeyboardEvent) {
        if (event) {

            event.preventDefault();
            const closeBtns = document.getElementsByClassName('closeFormId');
            if (closeBtns && closeBtns.length > 0) {

                const closeBtn: HTMLElement = document.getElementsByClassName('closeFormId')[closeBtns.length - 1] as HTMLElement;
                closeBtn.click();
            }
        }
    }

    // open add form dialog if exists on window Ctrl + A key press
    @HostListener('document:keydown.control.a', ['$event'])
    handleCtrlAKey(event: KeyboardEvent) {
        if (event) {

            const formKeyId = document.getElementById('formKeyId');
            if (Object.keys(formKeyId || {}).length === 0) {

                event.preventDefault();
                const addBtns = document.getElementsByClassName('addFormId');
                if (addBtns && addBtns.length > 0) {

                    const addBtn: HTMLElement = document.getElementsByClassName('addFormId')[addBtns.length - 1] as HTMLElement;
                    addBtn.click();
                }
            }
        }
    }

    // open add form dialog if exists on window Ctrl + E key press
    @HostListener('document:keydown.control.e', ['$event'])
    handleCtrlEKey(event: KeyboardEvent) {
        if (event) {

            const formKeyId = document.getElementById('formKeyId');
            if (Object.keys(formKeyId || {}).length === 0) {

                event.preventDefault();
                const editBtns = document.getElementsByClassName('editFormId');
                if (editBtns && editBtns.length > 0) {

                    const editBtn: HTMLElement = document.getElementsByClassName('editFormId')[editBtns.length - 1] as HTMLElement;
                    editBtn.click();
                }
            }
        }
    }
}