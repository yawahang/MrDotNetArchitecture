import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MvNavigationAction } from 'src/core/model/base.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from 'src/core/service/base.service';
import { gridColumns } from './role-navigation-list-grid.column';
import { UtilityService } from 'src/core/service/utility.service';
import { AppConst } from 'src/app/app.config';
import { MvGridColumn } from 'src/shared/controls/mat-grid/mat-grid.model';

@Component({
  selector: 'app-role-navigation-list-grid',
  templateUrl: './role-navigation-list-grid.component.html',
  styleUrls: ['./role-navigation-list-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleNavigationListGridComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  @ViewChild('searchText', { static: true }) searchText: HTMLInputElement;

  // Grid Start 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  gridColumns: MvGridColumn[] = gridColumns;
  dataSource: MatTableDataSource<MvNavigationAction>;
  totalRows: number;
  gridData: MvNavigationAction[] = [];
  selection = new SelectionModel<MvNavigationAction>(true, []);
  gridConfig = { SearchText: '', Offset: 0, PageSize: 10, SortBy: 'Navigation', SortOrder: 'ASC' };// as MvGridConfig;
  isSticky = false;
  isSortable = true;
  displayedColumns: string[];
  actionColumns: string[];
  gridColumnOption: any;
  pageSizeOptions: number[];
  noRecordMessage = '';
  parentData: any;
  loading = false;
  // Grid End

  activeStatus = true;

  constructor(private bottomSheetRef: MatBottomSheetRef<RoleNavigationListGridComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public dialog: MatDialog,
    private bs: BaseService,
    private us: UtilityService) {

    this._unsubscribeAll = new Subject();
    this.parentData = <MvNavigationAction>data;
  }

  ngOnInit() {

    // Grid Start
    this.gridColumnOption = AppConst.Data.GridOptions.GridColumnOption;
    this.noRecordMessage = AppConst.Data.GridOptions.NoRecordMessage;
    this.gridConfig.PageSize = AppConst.Data.GridOptions.PageSize;
    this.pageSizeOptions = AppConst.Data.GridOptions.PageSizeOptions;

    const stickyCol = this.gridColumns.filter((col: MvGridColumn) => col?.Sticky);
    if (stickyCol && stickyCol.length > 0) {
      this.isSticky = true;
    }

    const disableSort = this.gridColumns.filter((col: MvGridColumn) => col?.DisableSort);
    if (disableSort && disableSort.length > 0) {
      this.isSortable = false;
    }

    this.actionColumns = this.gridColumns.filter((col: MvGridColumn) => (col?.Type === 'Action')).map((col: any) => col?.Name);
    this.displayedColumns = this.gridColumns.map((col: any) => col?.Name);
    // Grid End

    this.loading = true;
    this.getRoleNavigationActionList();
  }

  // Grid Start
  applyFilter(event: Event) {

    this.loading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.gridConfig.SearchText = filterValue.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.getRoleNavigationActionList();
  }

  pageChange(e: PageEvent) {

    this.loading = true;
    this.gridConfig.PageSize = e?.pageSize || AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Offset = ((e?.pageIndex || 0) * this.gridConfig.PageSize);
    this.getRoleNavigationActionList(e.pageSize * e.pageIndex);
  }

  sortChange(e: Sort) {

    this.loading = true;
    this.gridConfig.SortBy = e?.active || 'Navigation';
    this.gridConfig.SortOrder = e?.direction || 'ASC';
    this.getRoleNavigationActionList();
  }

  setTableDataSource() {

    this.dataSource = new MatTableDataSource<MvNavigationAction>(this.gridData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // select default
    this.dataSource?.data.forEach((row: MvNavigationAction) => {
      if (row.IsSelect) {
        this.selection.select(row);
      }
    });

    this.dataSource._updateChangeSubscription();
    this.loading = false;
  }

  // Whether the number of selected elements matches the total number of rows
  isAllSelected() {

    const numSelected = this.selection.selected.length;
    return numSelected === this.totalRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection
  selectAll() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource?.data.forEach(row => this.selection.select(row));
  }
  // Grid End

  // Service Start
  getRoleNavigationActionList(currentSize?: number) {

    const param = {
      RoleId: this.parentData?.RoleId,
      Option: this.gridConfig
    };
    this.bs.getRoleNavigationAction(param, true).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      if (response) {

        if (typeof currentSize === 'number') { // fetch next

          this.gridData.length = currentSize;
          this.gridData.push(...response?.Data);
          this.gridData.length = response?.TotalRows;
        } else {

          this.gridData = response?.Data;
          this.gridData.length = response?.TotalRows;
        }
      } else {

        this.gridData = [];
        this.gridData.length = 0;
      }

      this.totalRows = response?.TotalRows || 0;
      this.setTableDataSource();
    });
  }
  // Service End

  saveClick() {

    const navActionIdList = this.selection.selected.map(r => {
      return { NavigationId: r.NavigationId, NavigationActionId: r.NavigationActionId };
    });

    this.bs.setRoleNavigationAction({
      RoleId: this.parentData?.RoleId,
      NavigationActionIdList: navActionIdList
    }, true)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

        if (response && response?.Data && response?.Data[0]) {

          this.us.openSnackBar('FormSaved', 'success');
        } else {

          this.us.openSnackBar('FormSaveFailed', 'error');
        }

        this.bottomSheetRef.dismiss();
      });
  }

  cancelClick() {

    this.bottomSheetRef.dismiss();
  }

  clearSearch() {

    this.loading = true;
    this.gridConfig.SearchText = '';
    this.searchText['nativeElement']['value'] = '';
    this.gridConfig.PageSize = AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Offset = 0;
    this.getRoleNavigationActionList();
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
