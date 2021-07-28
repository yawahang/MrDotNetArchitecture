import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConst } from 'src/app/app.config';
import { MvListItem, MvNavigationActionList, MvRole, MvRoleFilter } from 'src/core/model/base.model';
import { BaseService } from 'src/core/service/base.service';
import { UtilityService } from 'src/core/service/utility.service';
import { RoleFormComponent } from './role-form/role-form.component';
import { gridColumns } from './role-grid.column';
import { RoleNavigationComponent } from './role-navigation/role-navigation.component';
import { MvGridConfig, MvGridPaging } from 'src/shared/controls/mat-grid/mat-grid.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleComponent implements OnInit, OnDestroy {

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
    FileName: 'Role_Export',
    Option: {
      SearchText: '',
      Filter: {
        StatusIdList: []
      },
      Offset: 0,
      PageSize: 10,
      SortBy: 'Role',
      SortOrder: 'ASC'
    },
    RowActionOption: {
      DblClickNavigationAction: 'AssignRole'
    }
  } as MvGridConfig<MvRoleFilter>;

  selectedRow: MvRole = <MvRole>{};
  // Grid End

  allStatus = true;
  statusModel = [];
  statusList: MvListItem[] = [];

  constructor(private bs: BaseService,
    public dialog: MatDialog,
    private us: UtilityService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.gridConfig.Columns = gridColumns;
    this.getRole();
    this.getStatusList();
  }

  getRole() {

    this.gridConfig.Loading = true;
    this.gridConfig = { ...this.gridConfig }; // refresh gridConfig 
    this.gridConfig.Option.Filter.StatusIdList = this.statusModel;
    const param = {
      Option: this.gridConfig.Option
    };
    this.bs.getRole(param)
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
    this.getRole();
  }

  // Grid Start  
  onRowDblClick(row: MvRole) {

    this.selectedRow = { ...row };
    this.assignNavigation();
  }

  onRowClick(row: MvRole) {

    this.selectedRow = { ...row };
  }

  onPageChange(event: MvGridPaging) {

    if (event) {

      this.gridConfig.Option.Offset = event.Offset;
      this.gridConfig.Option.PageSize = event.PageSize;
      this.getRole();
    }
  }

  onSortChange(event: MvGridPaging) {

    if (event) {

      this.gridConfig.Option.SortBy = event.SortBy;
      this.gridConfig.Option.SortOrder = event.SortOrder;
      this.getRole();
    }
  }

  onRowActionClick(event: any) {

    if (event && event?.action && event?.row) {

      this.selectedRow = { ...event?.row };
      switch (event?.action?.NavigationAction) {

        case 'Edit':
          this.openDialog('Edit');
          break;
        case 'AssignNavigation':
          this.assignNavigation();
          break;
      }
    }
  }
  // Grid End

  onActionClick(event: MvNavigationActionList) {

    if (event) {

      switch (event.NavigationAction) {

        case 'Refresh':
          this.getRole();
          break;
        case 'Edit':
          this.openDialog('Edit');
          break;
        case 'Add':
          this.selectedRow = {} as MvRole;
          this.openDialog('Add');
          break;
        case 'AssignNavigation':
          this.assignNavigation();
          break;
      }
    }
  }

  assignNavigation() {

    if (!this.selectedRow || Object.keys(this.selectedRow).length === 0) {

      this.us.openSnackBar('SelectARow', 'info');
      return;
    }

    const dialogRef = this.dialog.open(RoleNavigationComponent, {
      disableClose: true,
      panelClass: 'role-navigation-dialog',
      data: { ...this.selectedRow }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {

      });
  }

  openDialog(action: string) {

    if (action === 'Edit' && (!this.selectedRow || Object.keys(this.selectedRow).length === 0)) {

      this.us.openSnackBar('SelectARow', 'info');
      return;
    }

    if (action === 'Edit' && this.selectedRow.IsSystem) {

      this.us.openSnackBar('NoAccessToEdit', 'info');
      return;
    }

    const dialogRef = this.dialog.open(RoleFormComponent, {
      disableClose: true,
      panelClass: 'role-form-dialog',
      data: {
        action: action,
        data: { ...this.selectedRow }
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          this.selectedRow = response;
          if (action === 'Edit') {

            this.us.swapArrayObject(response, this.gridConfig.Data.Data, 'RoleId');
          } else {

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

    this.selectedRow = {} as MvRole;
    this.getRole();
  }

  clearSearch() {

    this.gridConfig.Option.SearchText = '';
    this.searchText['nativeElement']['value'] = '';
    this.gridConfig.Option.PageSize = AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Option.Offset = 0;
    this.getRole();
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}