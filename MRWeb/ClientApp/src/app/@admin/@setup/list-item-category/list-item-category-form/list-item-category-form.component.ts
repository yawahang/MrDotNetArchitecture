import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MvListItemCategory } from 'src/core/model/base.model';
import { AuthService } from 'src/core/service/auth.service';
import { BaseService } from 'src/core/service/base.service';
import { UtilityService } from 'src/core/service/utility.service';

@Component({
  selector: 'app-list-item-category-form',
  templateUrl: './list-item-category-form.component.html',
  styleUrls: ['./list-item-category-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListItemCategoryFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  action: string;
  selectedModel: MvListItemCategory = <MvListItemCategory>{};
  fmListItemCategory: FormGroup;
  categoryList = [];

  constructor(
    public dialogRef: MatDialogRef<ListItemCategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public auth: AuthService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public bs: BaseService,
    private us: UtilityService
  ) {
    this._unsubscribeAll = new Subject();
    this.action = data?.action;
    this.selectedModel = <MvListItemCategory>data?.data;
  }

  ngOnInit() {

    this.initForm();
  }

  initForm() {

    this.fmListItemCategory = this.fb.group({
      Description: [this.selectedModel.Description, Validators.required],
      Category: [this.selectedModel.Category, Validators.required]
    });
  }

  cancelClick() {
    this.dialogRef.close();
  }

  submitForm() {

    this.us.formUtility(this.fmListItemCategory, 'validate');
    if (!this.fmListItemCategory.pristine || this.fmListItemCategory.valid) {

      const value = this.us.formUtility(this.fmListItemCategory, 'value');
      value['ListItemCategoryId'] = this.action === 'Add' ? 0 : this.selectedModel.ListItemCategoryId;
      this.bs.setListItemCategory(value)
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

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
