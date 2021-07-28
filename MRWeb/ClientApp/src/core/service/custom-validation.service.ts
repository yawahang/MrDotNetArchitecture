import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CustomValidationService {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

        const config = {
            required: 'Required',
            invalidCreditCard: 'InvalidCreditCard',
            invalidEmail: 'InvalidEmail',
            invalidPhone: 'InvalidPhone',
            invalidDateTime: 'InvalidDate',
            invalidPassword: 'InvalidPassword',
            invalidDateOfBirth: 'InvalidDateOfBirth',
            minlength: `MinimumLength${validatorValue.requiredLength}`
        };

        return config[validatorName];
    }

    static creditCardValidator(control: any) { // Visa, MasterCard, American Express, Diners Club, Discover, JCB

        if (control?.value) {

            if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
                return null;
            } else {
                return { invalidCreditCard: true };
            }
        } else {

            return null;
        }
    }

    static emailValidator(control: any) { // RFC 2822 compliant regex

        if (control?.value) {

            if (control.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                return null;
            } else {
                return { invalidEmailAddress: true };
            }
        } else {

            return null;
        }
    }

    static mobileValidator(control: any) { // Mobile phone

        if (control?.value) {

            if (control.value.match(/([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/)) {
                return null;
            } else {
                return { invalidPhone: true };
            }
        } else {

            return null;
        }
    }

    static dateTimeFormatValidator(control: any) { // Datetime Format

        if (control?.value) {

            if (control.value.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2} (0[1-9]|1[0-2]):[0-5][0-9] [AP][M]/)) {
                return null;
            } else {
                return { invalidDateTime: true };
            }
        } else {

            return null;
        }
    }


    static passwordValidator(control: any) {
        // {6,100}           - Password should nbe between 6 and 100 characters
        // (?=.*[0-9])       - Password should have at least one number
        if (control?.value) {

            if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                return null;
            } else {
                return { invalidPassword: true };
            }
        } else {

            return null;
        }
    }
 
    static dateOfBirthValidator  (control: any) {
          
        if (control?.value) {
            
            const year = new Date(control.value).getFullYear();
            const today = new Date().getFullYear();
            if (today - year >= 12) {
                return null;
            } else {
                return { invalidDateOfBirth: true };
            }
        } else {
            return null;
        }
    }
 
    static dateRangeValidator(control: any) {

        if (control?.value) {

            // if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            //     return null;
            // } else {
            //     return { invalidPassword: true };
            // }
        } else {

            return null;
        }
    }
}
