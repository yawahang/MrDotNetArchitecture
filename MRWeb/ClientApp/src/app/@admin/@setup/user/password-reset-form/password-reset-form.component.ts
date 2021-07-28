import { AccountService } from 'src/core/service/account.service';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MvUser } from '../user.model';
import { UtilityService } from 'src/core/service/utility.service';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/shared/components/confirm-dialog/confirm-dialog.component';
import { CustomValidationService } from 'src/core/service/custom-validation.service';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordResetFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  selectedModel: MvUser = <MvUser>{};
  fmUser: FormGroup;

  constructor(public dialogRef: MatDialogRef<PasswordResetFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public asr: AccountService,
    private us: UtilityService) {

    this._unsubscribeAll = new Subject();
    this.selectedModel = <MvUser>data?.data;
  }

  ngOnInit() {

    this.getPasswordInfo();
    this.initForm();
  }

  initForm() {

    this.fmUser = this.fb.group({
      Username: [{ value: this.selectedModel.Username, disabled: true }, [Validators.required, CustomValidationService.emailValidator]],
      Password: ['', [Validators.required, CustomValidationService.passwordValidator]],
      ConfirmPassword: ['', [Validators.required, CustomValidationService.passwordValidator]]
    });
  }

  cancelClick() {
    this.dialogRef.close();
  }

  getPasswordInfo() {

    this.asr.getPasswordInfo({ UserId: this.selectedModel.UserId || 0 })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response && response?.Data && response?.Data[0]) {

          this.fmUser.get('Password').setValue(response?.Data[0]['Password']);
          this.fmUser.get('ConfirmPassword').setValue(response?.Data[0]['Password']);
        } else {

          this.us.openSnackBar('SomethingWentWrong', 'error');
        }
      });
  }

  changePassword() {

    this.us.formUtility(this.fmUser, 'validate');
    if (!this.fmUser.pristine || this.fmUser.valid) {

      let value = this.us.formUtility(this.fmUser, 'value');
      if (value['Password'] !== value['ConfirmPassword']) {

        this.us.openSnackBar('PasswordDoesntMatch', 'warning');
        return;
      }

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        panelClass: 'confirm-dialog-wrapper',
        data: {
          title: 'ChangePassword',
          message: 'WantToChangePassword',
          yesBtnText: 'Yes',
          noBtnText: 'No'
        }
      });

      dialogRef.afterClosed()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: any) => {

          if (response) {

            const param = { UserId: this.selectedModel.UserId || 0, Password: value['Password'] };
            this.asr.passwordResetTsk(param, true)
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe(response => {

                if (response && response?.Data && response?.Data[0]) {

                  this.us.openSnackBar('PasswordChanged', 'success');
                  this.dialogRef.close(true);
                } else {

                  this.dialogRef.close(false);
                  this.us.openSnackBar('SomethingWentWrong', 'error');
                }
              });
          } else {

            this.us.openSnackBar('ActionCancelled', 'error');
          }
        });
    } else {

      this.us.openSnackBar('InvalidForm', 'warning');
    }
  }

  close() {

    this.dialogRef.close(false);
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
