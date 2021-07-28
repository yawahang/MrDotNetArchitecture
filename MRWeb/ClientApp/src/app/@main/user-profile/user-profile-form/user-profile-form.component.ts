import { AccountService } from 'src/core/service/account.service';
import { UtilityService } from 'src/core/service/utility.service';
import { MvUserProfile } from '../user-profile.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerHeaderComponent } from 'src/shared/controls/date-picker-header/date-picker-header.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidationService } from 'src/core/service/custom-validation.service';
import { AppConst } from 'src/app/app.config';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UserProfileFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  formErrors: any;
  fmUser: FormGroup;
  selectionModel: MvUserProfile = <MvUserProfile>{};
  loading = false;

  pickerHeader = DatePickerHeaderComponent;
  dateOfBirthStart = new Date((new Date().getFullYear() - 12), 0, 1);

  constructor(public dialogRef: MatDialogRef<UserProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public asr: AccountService,
    public us: UtilityService
  ) {
    this._unsubscribeAll = new Subject();
    this.selectionModel = <MvUserProfile>data?.data || {} as MvUserProfile;
  }

  ngOnInit() {

    this.fmUser = this.fb.group({
      Username: [this.selectionModel.Username, [Validators.required, CustomValidationService.emailValidator]],
      FirstName: [this.selectionModel.FirstName, Validators.required],
      MiddleName: [this.selectionModel.MiddleName],
      LastName: [this.selectionModel.LastName, Validators.required],
      DateOfBirth: [this.selectionModel.DateOfBirth, CustomValidationService.dateOfBirthValidator],
      Address: [this.selectionModel.Address]
    });
  }

  cancelClick() {

    this.dialogRef.close();
  }

  submitForm() {

    this.us.formUtility(this.fmUser, 'value');
    if (!this.fmUser.pristine || this.fmUser.valid) {

      const value = this.us.formUtility(this.fmUser, 'value');
      value['Address'] = [{
        Entity: 'User',
        EntityId: this.selectionModel.UserId || 0,
        Address: value['Address']
      }];
      this.asr.userProfileUpd(value, true)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: any) => {

          if (response && response?.Data && response?.Data[0]) {

            response.Data[0].ProfileImage = response?.Data[0]?.ProfileImage || AppConst.Data?.ProfileImgUrl;
            this.dialogRef.close(response?.Data[0]);
            this.us.openSnackBar('FormSaved', 'success');
          } else {

            this.us.openSnackBar('FormSaveFailed', 'error');
          }
        });
    } else {

      this.us.openSnackBar('PleaseEnterValidData', 'error');
    }

  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
