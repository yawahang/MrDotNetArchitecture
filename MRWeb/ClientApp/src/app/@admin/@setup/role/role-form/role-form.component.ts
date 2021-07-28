import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MvListItem, MvRole } from 'src/core/model/base.model';
import { AuthService } from 'src/core/service/auth.service';
import { BaseService } from 'src/core/service/base.service';
import { UtilityService } from 'src/core/service/utility.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  action: string;
  selectedModel: MvRole = <MvRole>{};
  fmRole: FormGroup;
  statusList: MvListItem[] = [];

  constructor(public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public auth: AuthService,
    public fb: FormBuilder,
    public bs: BaseService,
    private us: UtilityService) {

    this._unsubscribeAll = new Subject();
    this.action = data?.action;
    this.selectedModel = <MvRole>data?.data;
  }

  ngOnInit() {

    this.getStatusList();
    this.initForm();
  }

  initForm() {

    this.fmRole = this.fb.group({
      Role: [this.selectedModel.Role, Validators.required],
      StatusListItemId: [this.selectedModel.StatusListItemId, Validators.required]
    });
  }

  cancelClick() {
    this.dialogRef.close();
  }

  submitForm() {

    this.us.formUtility(this.fmRole, 'validate');
    if (!this.fmRole.pristine || this.fmRole.valid) {

      const value = this.us.formUtility(this.fmRole, 'value');
      value['RoleId'] = this.action === 'Add' ? 0 : this.selectedModel.RoleId;
      this.bs.setRole(value, true)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {

          if (response && response?.Data && response?.Data[0]) {

            this.dialogRef.close(response?.Data[0]);
            this.us.openSnackBar('FormSaved', 'success');
          } else {

            this.us.openSnackBar('FormSaveFailed', 'error');
          }
        });
    } else {

      this.us.openSnackBar('InvalidForm', 'warning');
    }
  }

  getStatusList() {

    this.bs.getListItemList({ Category: 'Status' }, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          this.statusList = response?.Data || [];

          if (this.action === 'Add') {

            const active = this.statusList.filter((val: any) => (val?.ListItem === 'Active'));
            if (active && active[0]) {
              this.fmRole.get('StatusListItemId').setValue(active[0]['ListItemId'], { emitEvent: false });
            }
          }
        } else {

          this.statusList = [];
        }
      });
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
