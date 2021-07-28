import { AccountService } from 'src/core/service/account.service';
import { MvNavigationActionList, MvListItem } from './../../../../core/model/base.model';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AppConst } from 'src/app/app.config';
import { UtilityService } from 'src/core/service/utility.service';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRoleListGridComponent } from './user-role-list-grid/user-role-list-grid.component';
import { MvUser, MvUserFilter } from './user.model';
import { takeUntil } from 'rxjs/operators';
import { gridColumns } from './user-grid.column';
import { MvGridConfig, MvGridPaging } from 'src/shared/controls/mat-grid/mat-grid.model';
import { BaseService } from 'src/core/service/base.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  @ViewChild('searchText', { static: true }) searchText: HTMLInputElement;

  // Grid Start 
  gridConfig = {
    Columns: [],
    Data: {
      Data: [],
      TotalRows: 0
    },
    RowTooltip: 'DoubleClickForAssignRole',
    Loading: true,
    FileName: 'User_Export',
    Option: {
      SearchText: '',
      Filter: {
        StatusIdList: []
      },
      Offset: 0,
      PageSize: 10,
      SortBy: 'FirstName',
      SortOrder: 'ASC'
    },
    RowActionOption: {
      DblClickNavigationAction: 'AssignRole'
    }
  } as MvGridConfig<MvUserFilter>;

  selectedRow: MvUser = <MvUser>{};
  // Grid End

  allStatus = true;
  statusModel = [];
  statusList: MvListItem[] = [];

  constructor(
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private asr: AccountService,
    public bs: BaseService,
    private us: UtilityService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.gridConfig.Columns = gridColumns;
    this.getUser();
    this.getStatusList();
  }

  getUser() {

    this.gridConfig.Loading = true;
    this.gridConfig = { ...this.gridConfig }; // refresh gridConfig 
    this.gridConfig.Option.Filter.StatusIdList = this.statusModel;
    const param = {
      Option: this.gridConfig.Option
    };
    this.asr.getUser(param)
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
    this.getUser();
  }

  // Grid Start  
  onRowDblClick(row: MvUser) {

    this.selectedRow = { ...row };
    this.assignRole();
  }

  onRowClick(row: MvUser) {

    this.selectedRow = { ...row };
  }

  onPageChange(event: MvGridPaging) {

    if (event) {

      this.gridConfig.Option.Offset = event.Offset;
      this.gridConfig.Option.PageSize = event.PageSize;
      this.getUser();
    }
  }

  onSortChange(event: MvGridPaging) {

    if (event) {

      this.gridConfig.Option.SortBy = event.SortBy;
      this.gridConfig.Option.SortOrder = event.SortOrder;
      this.getUser();
    }
  }

  onRowActionClick(event: any) {

    if (event && event?.action && event?.row) {

      this.selectedRow = { ...event?.row };
      switch (event?.action?.NavigationAction) {

        case 'Edit':
          this.openDialog('Edit');
          break;
        case 'AssignRole':
          this.assignRole();
          break;
        case 'PasswordInfo':
          this.passwordInfoClick();
          break;
      }
    }
  }
  // Grid End

  onActionClick(event: MvNavigationActionList) {

    if (event) {

      switch (event.NavigationAction) {

        case 'Refresh':
          this.getUser();
          break;
        case 'Edit':
          this.openDialog('Edit');
          break;
        case 'Add':
          this.selectedRow = {} as MvUser;
          this.openDialog('Add');
          break;
        case 'AssignRole':
          this.assignRole();
          break;
        case 'PasswordInfo':
          this.passwordInfoClick();
          break;
      }
    }
  }

  assignRole() {

    if (!this.selectedRow || Object.keys(this.selectedRow).length === 0) {

      this.us.openSnackBar('SelectARow', 'info');
      return;
    }

    const bottomSheetRef = this.bottomSheet.open(UserRoleListGridComponent, {
      disableClose: true,
      panelClass: 'user-role-list-dialog',
      data: { ...this.selectedRow }
    });

    bottomSheetRef.afterDismissed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: MvUser) => {

        if (response) {

          this.selectedRow = response;
          this.us.swapArrayObject(response, this.gridConfig.Data.Data, 'UserId');
          this.gridConfig = { ...this.gridConfig }; // refresh gridConfig 
        }
      });
  }

  passwordInfoClick() {

    if (!this.selectedRow || Object.keys(this.selectedRow).length === 0) {

      this.us.openSnackBar('SelectARow', 'info');
      return;
    }

    const dialogRef = this.dialog.open(PasswordResetFormComponent, {
      disableClose: true,
      panelClass: 'password-reset-form-dialog',
      data: {
        data: { ...this.selectedRow }
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {

        }
      });
  }

  openDialog(action: string) {

    if (action === 'Edit' && (!this.selectedRow || Object.keys(this.selectedRow).length === 0)) {

      this.us.openSnackBar('SelectARow', 'info');
      return;
    }

    const dialogRef = this.dialog.open(UserFormComponent, {
      disableClose: true,
      panelClass: 'user-form-dialog',
      width: '50vw',
      data: {
        action: action,
        data: { ...this.selectedRow }
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          if (action === 'Edit') {

            this.selectedRow = response;
            this.us.swapArrayObject(response, this.gridConfig.Data.Data, 'UserId');
          } else {

            this.selectedRow = {} as MvUser;
            this.gridConfig.Data.Data.unshift(response);
          }

          this.gridConfig = { ...this.gridConfig }; // refresh gridConfig 
        }
      });
  }

  getStatusList() {

    this.bs.getListItemList({ Category: 'Status' })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          this.statusList = response?.Data || [];
          const activeStatus = this.statusList.filter((tt: MvListItem) => tt.ListItem === 'Active');
          if (activeStatus && activeStatus[0]) {

            this.statusModel = [activeStatus[0].ListItemId];
          } else {

            this.statusModel = this.statusList.map((tt: MvListItem) => tt.ListItemId);
          }
        } else {

          this.statusList = [];
        }
      });
  }

  onStatusChange() {

    this.selectedRow = {} as MvUser;
    this.getUser();
  }

  clearSearch() {

    this.gridConfig.Option.SearchText = '';
    this.searchText['nativeElement']['value'] = '';
    this.gridConfig.Option.PageSize = AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Option.Offset = 0;
    this.getUser();
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}