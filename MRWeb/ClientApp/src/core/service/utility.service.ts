import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private snackBar: MatSnackBar,
    private translate: TranslateService) {
  }

  openSnackBar(message: string, type: string, duration?: number) {

    message = this.translate.instant(message) || message;
    this.snackBar.open(message, 'x', {
      duration: duration || 3000, // in milli-seconds
      panelClass: [type],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  /*
    Swap Object by Key
    =======================================
     Implementation:
                       TODO Input: arrayObj  = [{Name:"james",Id: 22},{Name:"john",Id: 25}]
                       TODO Input: arrayObjNew  = {Name:"shara",Id: 22}
                       swapArrayObject(arrayObjNew, arrayObj , 'Id');
                       ? Output: [{Name:"shara",Id: 22},{Name:"john",Id: 25}]
   */
  swapArrayObject(object: any, list: any[], primaryKey: string) {

    for (const x of list) {

      if (x[primaryKey] === object[primaryKey]) {

        const index = list.indexOf(x);
        list[index] = object;
        break;
      }
    }

    return list;
  }

  /*
      !Get Value
      =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     formUtility(form, 'value');
                     ? Output: form.value

      !Get Value By Fields
      =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     formUtility(form, 'value', ['userName','password]);
                     ? Output: form.value

      !Get Errors
      =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     formUtility(form, 'errors'); //*** get all errors
                     OR
                     formUtility(form, 'errors', ['userName','password]);  //*** get errors by fields
                     ? Output: { username: {required: true}, password: {required: true} }

      !Get Value Changes
      =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     formUtility(form, 'changes');
                     ? Output: { username: 'yawa@gmail.com', password: 'password@123' }
  */
  formUtility(form: FormGroup, type: string, fields?: string[]): any {

    if (form && type !== '') {

      if (type === 'validate') {

        Object.keys(form.controls).forEach(field => {
          const control = form.get(field);
          control.markAsTouched({ onlySelf: true });
        });

        return true;
      } else {

        const value = form.value;

        if (type === 'value' && (!fields || fields.length === 0)) {

          for (const key in value) {
            if (Object.prototype.toString.call(value[key]) === '[object Date]') {
              value[key] = this.getISODateString(value[key]);
            }
          }

          return value;
        } else if (type === 'value' && fields.length > 0) {

          for (const field of fields) {

            if (!value.hasOwnProperty(field)) {
              delete value[field];
            }

            if (Object.prototype.toString.call(value[field]) === '[object Date]') {
              value[field] = this.getISODateString(value[field]);
            }
          }

          return value;
        } else if (type === 'errors') {

          const errors = {};

          for (const field in fields) {

            if (!value.hasOwnProperty(field)) {
              continue;
            }

            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
              errors[field] = control.errors;
            }
          }

          return errors;
        } else if (type === 'changes') {

          const dirty = {};
          for (const field of fields) {

            if (form.controls[field].dirty) {

              dirty[field] = value[field].trim();
            }
          }

          return dirty;
        }
      }
    }
  }

  getISODateString(value: any) {

    if (value) {

      let tzoffset: number;
      let isoDate: string;
      tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      isoDate = (new Date(value.getTime() - tzoffset)).toISOString().slice(0, -1);
      return isoDate;
    } else {

      return value;
    }
  }
  /*
    =======================================
      Implementation:
                     TODO Input: form: FormGroup;
                     thousandSeperator(150000.22);
                     ? Output: "150,000.22'
  */
  thousandSeperator(value: number) {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      value;
    }
  }

  /*
    =======================================
      Implementation:
                     TODO Input: date string or object;
                     formatDate('2021-02-22T07:34:01.532Z', 'local');
                     ? Output: "2/22/2021, 1:21:59 PM"
  */
  formatDate(value: any, type: string) {
    if (value) {

      if (typeof value === 'object') {

        `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()} ${this.formatAMPM(value)}`;
      } else {

        const date = new Date(value);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${this.formatAMPM(date)}`;
      }
    } else {

      return value;
    }
  }

  formatAMPM(date: any) {

    if (date) {

      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    } else {

      return 'Invalid Date';
    }
  }

  validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  }

  isTodayOrGreater(date: string) {

    if (date) {
      try {
        if (new Date(date) >= new Date()) {
          return true;
        } else {
          return false;
        }
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }
}