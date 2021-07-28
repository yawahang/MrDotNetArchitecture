import { FormControl, Validators } from '@angular/forms';
import { MvNavigation } from './../../../../../core/model/base.model';
import { AccountService } from 'src/core/service/account.service';
import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MvUserRole, MvApplication } from 'src/core/model/base.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from 'src/core/service/base.service';
import { gridColumns } from './user-role-list-grid.column';
import { AppConst } from 'src/app/app.config';
import { MvUser } from '../user.model';
import { UtilityService } from 'src/core/service/utility.service';
import { MvGridConfig, MvGridPaging } from 'src/shared/controls/mat-grid/mat-grid.model';

@Component({
  selector: 'user-role-list-grid',
  templateUrl: './user-role-list-grid.component.html',
  styleUrls: ['./user-role-list-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserRoleListGridComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  @ViewChild('searchText', { static: true }) searchText: HTMLInputElement;

  // Grid Start    
  gridConfig = {
    Columns: [],
    Data: {
      Data: [],
      TotalRows: 0
    },
    Loading: true,
    FileName: 'User_Role_Export',
    Option: {
      SearchText: '',
      Offset: 0,
      PageSize: 10,
      SortBy: 'Role',
      SortOrder: 'ASC'
    }
  } as MvGridConfig;

  parentData: MvUser = <MvUser>{};
  // Grid End

  applicationList: MvApplication[] = [];
  navigationList: MvNavigation[] = [];
  roleList: MvUserRole[] = [];
  defaultNavigation: FormControl;

  constructor(private bottomSheetRef: MatBottomSheetRef<UserRoleListGridComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public dialog: MatDialog,
    private bs: BaseService,
    private asr: AccountService,
    private us: UtilityService) {
    this._unsubscribeAll = new Subject();
    this.parentData = <MvUser>data;
  }

  ngOnInit() {

    this.defaultNavigation = new FormControl(this.parentData.DefaultNavigationId, Validators.required);
    this.gridConfig.Columns = gridColumns;
    this.getUserRoleList();
  }

  getUserRoleList() {

    this.gridConfig.Loading = true;
    this.gridConfig = { ...this.gridConfig }; // refresh gridConfig 

    const param = {
      UserId: this.parentData?.UserId,
      Option: this.gridConfig.Option
    };
    this.asr.getUserRole(param, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          this.gridConfig.Data.Data = response?.Data;
          this.gridConfig.Data.TotalRows = response?.TotalRows;
        } else {

          this.gridConfig.Data.Data = [];
          this.gridConfig.Data.TotalRows = 0;
        }

        this.gridConfig.Loading = false;
        this.gridConfig = { ...this.gridConfig }; // refresh gridConfig 
      });
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.gridConfig.Option.SearchText = filterValue.trim().toLowerCase();
    this.getUserRoleList();
  }

  // Grid Start

  onPageChange(event: MvGridPaging) {

    if (event) {

      this.gridConfig.Option.Offset = event.Offset;
      this.gridConfig.Option.PageSize = event.PageSize;
      this.getUserRoleList();
    }
  }

  onSortChange(event: MvGridPaging) {

    if (event) {

      this.gridConfig.Option.SortBy = event.SortBy;
      this.gridConfig.Option.SortOrder = event.SortOrder;
      this.getUserRoleList();
    }
  }

  onCheckBoxChange(event: any[]) {

    if (event) {

      this.roleList = [...event];
      this.getNavigationList();
    }
  }

  onCheckAll(event: any[]) {

    if (event) {

      this.roleList = [...event];
      this.getNavigationList();
    }
  }
  // Grid End

  getNavigationList() {

    if (this.roleList.length > 0) {

      const param = {
        RoleIdList: this.roleList.map((v: MvUserRole) => v.RoleId),
        Type: 'External'
      };

      this.bs.getNavigationList(param, true)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {

          if (response && response?.Data) {

            this.navigationList = response?.Data || [];
            this.navigationList.map((nav: MvNavigation) => {

              if (this.applicationList.filter((ap: MvApplication) => ap.ApplicationId === nav.ApplicationId).length === 0) {

                this.applicationList.push({
                  ApplicationId: nav.ApplicationId,
                  Application: nav.Application
                });
              }
            })
          } else {

            this.navigationList = [];
            this.parentData.DefaultNavigationId = 0;
            this.applicationList = [];
            this.parentData.DefaultApplicationId = 0;
          }
        });
    } else {

      this.navigationList = [];
      this.parentData.DefaultNavigationId = 0;
    }
  }

  saveClick() {

    if (!this.parentData.CurrentRoleId || this.parentData.CurrentRoleId === 0) {

      this.us.openSnackBar('CurrentRoleRequired', 'warning');
      return;
    }

    if (!this.parentData.DefaultNavigationId || this.parentData.DefaultNavigationId === 0) {

      this.us.openSnackBar('DefaultNavigationRequired', 'warning');
      return;
    }

    const app = this.navigationList.filter((ap: MvNavigation) => ap.NavigationId === this.parentData.DefaultNavigationId);

    const param = {
      UserId: this.parentData.UserId || 0,
      CurrentRoleId: this.parentData.CurrentRoleId,
      DefaultApplicationId: app[0]?.ApplicationId || 0,
      DefaultNavigationId: this.parentData.DefaultNavigationId
    };
    this.asr.setUserDefault(param, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {

        if (response && response?.Data && response?.Data[0]) {

          this.setUserRole();
        } else {

          this.us.openSnackBar('FormSaveFailed', 'error');
        }
      });
  }

  setUserRole() {

    const param = this.roleList.map((v: MvUserRole) => {
      return {
        UserId: this.parentData.UserId || 0,
        RoleId: v.RoleId
      };
    })

    this.asr.setUserRole(param, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response && response?.Data && response?.Data[0]) {

          this.bottomSheetRef.dismiss(response?.Data[0]);
          this.us.openSnackBar('FormSaved', 'success');
        } else {

          this.us.openSnackBar('FormSaveFailed', 'error');
        }
      });
  }

  cancelClick() {

    this.bottomSheetRef.dismiss();
  }

  clearSearch() {

    this.gridConfig.Option.SearchText = '';
    this.searchText['nativeElement']['value'] = '';
    this.gridConfig.Option.PageSize = AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Option.Offset = 0;
    this.getUserRoleList();
  }

  getApplicationNavigation(applicationId: number): MvNavigation[] {

    const nav = this.navigationList.filter(n => (n.ApplicationId === applicationId));
    return nav || [];
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
