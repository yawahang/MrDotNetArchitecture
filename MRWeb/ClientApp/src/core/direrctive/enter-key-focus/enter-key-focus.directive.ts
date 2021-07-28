import { Directive, HostListener } from '@angular/core';
@Directive({
    selector: '[enterKeyFocus]'
})
export class EnterKeyFocusDirective {

    allFormControls = [];

    constructor() {
    }

    @HostListener('keyup', ['$event']) onKeyUp(event: any) {

        if ((event?.which == 13 || event?.keyCode == 13)) {

            event.preventDefault();

            const formcontrolname = event?.srcElement?.getAttribute('formcontrolname');
            this.allFormControls = [];

            if (event?.srcElement?.form) {
                this.allFormControls = event?.srcElement?.form || [];
            }

            this.focusNextElement(formcontrolname);
        }
    }

    focusNextElement(formcontrolname: string, focus = false, control?: any, index?: number) {

        if (!control) {

            for (let i = 0; i < (this.allFormControls || []).length; i++) {

                if (this.allFormControls[i].getAttribute('formcontrolname') === formcontrolname) { // if currentElement[0] is current element where enter was pressed, find next mat-form-field

                    if (this.allFormControls[i + 1]) {

                        this.focusNextElement(formcontrolname, true, this.allFormControls[i + 1], i);
                    } else { // no control to focus in the form, focus first control

                        this.focusNextElement(formcontrolname, true, this.allFormControls[0], 0);
                    }
                    break;
                }
            }
        } else if (control && focus) {

            // focus next control or first input/control of form 
            // next control can be button[type="submit"] 
            if (control.localName === 'input' && !['hidden', 'submit', 'reset'].includes(control.getAttribute('type'))) {

                control.focus();
                return;
            }
            if (control && (['textarea', 'mat-select', 'select'].includes(control.localName))) {

                control.focus();
                return;
            }
            if (control.localName === 'button' && ['button', 'submit'].includes(control.getAttribute('type'))) {

                control.focus();
                return;
            }

            // nothing focused, eg: calendar btn/icon is next element in date picker, skip it
            this.focusNextElement(formcontrolname, true, this.allFormControls[index + 1], index + 1);
        }
    }
}