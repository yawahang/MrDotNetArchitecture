import { MvRole } from '../../../../../core/model/base.model';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseService } from 'src/core/service/base.service';
import { UtilityService } from 'src/core/service/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MvCheckedNode, MvTree, MvTreeConfig } from 'src/shared/controls/tree-view/tree-view.model';

@Component({
  selector: 'app-role-navigation',
  templateUrl: './role-navigation.component.html',
  styleUrls: ['./role-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleNavigationComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  treeViewConfig = {
    Expanded: true,
    Searchable: true,
    ReturnValueOnInit: true,
    Data: []
  } as MvTreeConfig;

  navigationList: MvTree[] = [];
  navigationActionList: MvCheckedNode[] = [];
  navigationActionIdList: number[] = [];
  navigationFilteredOptions: Observable<any[]>;

  parentData: MvRole;

  constructor(public dialogRef: MatDialogRef<RoleNavigationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bs: BaseService,
    public fb: FormBuilder,
    private us: UtilityService) {

    this._unsubscribeAll = new Subject();
    this.parentData = <MvRole>data;
  }

  ngOnInit() {

    this.getRoleNavigationActionList();
  }

  getRoleNavigationActionList() {

    this.bs.getRoleNavigationAction({ RoleId: this.parentData.RoleId }, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response && response?.Data && response?.Data[0]) {

          this.treeViewConfig.Data = response?.Data;
        } else {

          this.treeViewConfig.Data = [];
        }
      });
  }

  treeViewChange(e: any): void {

    if (e) {

      this.navigationActionList = e;
      this.navigationActionIdList = this.navigationActionList.map((n: MvCheckedNode) => n.EnityId);
    }
  }

  cancelClick() {

    this.dialogRef.close();
  }

  saveRoleNavigation() {

    this.bs.setRoleNavigationAction({
      RoleId: this.parentData?.RoleId,
      NavigationActionIdList: this.navigationActionIdList
    }, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response && response?.Data && response?.Data[0]) {

          this.us.openSnackBar('FormSaved', 'success');
        } else {

          this.us.openSnackBar('FormSaveFailed', 'error');
        }

        this.dialogRef.close();
      });
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
