import { MvListItemList } from '../../../../../core/model/base.model';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/core/service/auth.service';
import { BaseService } from 'src/core/service/base.service';
import { UtilityService } from 'src/core/service/utility.service';

@Component({
  selector: 'app-list-item-form',
  templateUrl: './list-item-form.component.html',
  styleUrls: ['./list-item-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListItemFormComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;

  action: string;
  selectedModel: MvListItemList = <MvListItemList>{};
  categoryList: [];
  fmListItem: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ListItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public auth: AuthService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public bs: BaseService,
    private us: UtilityService
  ) {
    this._unsubscribeAll = new Subject();
    this.action = data?.action;
    this.selectedModel = <MvListItemList>data?.data;
  }

  ngOnInit() {

    this.getStatusList();
    this.initForm();
  }

  initForm() {

    this.fmListItem = this.fb.group({
      ListItem: [this.selectedModel.ListItem, Validators.required],
      Description: [this.selectedModel.Description, Validators.required],
      ListItemCategoryId: [this.selectedModel.ListItemCategoryId, Validators.required]
    });
  }

  cancelClick() {
    this.dialogRef.close();
  }

  submitForm() {

    this.us.formUtility(this.fmListItem, 'validate');
    if (!this.fmListItem.pristine || this.fmListItem.valid) {

      const value = this.us.formUtility(this.fmListItem, 'value');
      value['ListItemId'] = this.action === 'Add' ? 0 : this.selectedModel.ListItemId;
      this.bs.setListItem(value)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response) => {

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

    this.bs.getListItemCategoryList({})
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        if (response) {

          this.categoryList = response?.Data || [];
          if (this.action === 'Add') {

            const active = this.categoryList.filter((val: any) => val?.ListItem === 'Active');
            if (active && active[0]) {

              this.fmListItem.get('ListItemCategoryId').setValue(active[0]['ListItemCategoryId'], { emitEvent: false });
            }
          }
        } else {

          this.categoryList = [];
        }
      });
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
