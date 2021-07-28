import { AuthService } from 'src/core/service/auth.service';
import { ListItemCategoryFormComponent } from './list-item-category-form/list-item-category-form.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MvListItemCategory, MvListItemList } from 'src/core/model/base.model';
import { BaseService } from 'src/core/service/base.service';
import { UtilityService } from 'src/core/service/utility.service';
import { AppConst } from 'src/app/app.config';
import { gridColumns } from './list-item-category-column';
import { MvGridColumn } from 'src/shared/controls/mat-grid/mat-grid.model';

@Component({
  selector: 'app-list-item-category',
  templateUrl: './list-item-category.component.html',
  styleUrls: ['./list-item-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListItemCategoryComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  @ViewChild('searchText', { static: true }) searchText: HTMLInputElement;

  // Grid Start 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  gridColumns: MvGridColumn[] = gridColumns;
  dataSource: MatTableDataSource<MvListItemCategory>;
  gridData: MvListItemCategory[] = [];
  selection = new SelectionModel<MvListItemCategory>(false, []);
  gridConfig = { Status: 'Active', SearchText: '', Offset: 0, PageSize: 10, SortBy: 'Category', SortOrder: 'ASC' };// as MvGridConfig;
  isSortable = true;
  hasActions = false;
  displayedColumns: string[];
  gridColumnOption: any;
  pageSizeOptions: number[];
  noRecordMessage = '';
  selectedRow: MvListItemCategory = <MvListItemCategory>{};
  loading = false;
  // Grid End

  navigationId: number;
  navigationAction = [];

  constructor(private bottomSheetRef: MatBottomSheetRef<ListItemCategoryComponent>,
    private bs: BaseService,
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private us: UtilityService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.navigationId = this.auth.getActiveInternalNavigationId();

    // Grid Start
    this.gridColumnOption = AppConst.Data.GridOptions.GridColumnOption;
    this.noRecordMessage = AppConst.Data.GridOptions.NoRecordMessage;
    this.gridConfig.PageSize = AppConst.Data.GridOptions.PageSize;
    this.pageSizeOptions = AppConst.Data.GridOptions.PageSizeOptions;

    const disableSort = this.gridColumns.filter((col: MvGridColumn) => col?.DisableSort);
    if (disableSort && disableSort.length > 0) {
      this.isSortable = false;
    }

    this.hasActions = this.gridColumns.filter((col: MvGridColumn) => (['Actions'].includes(col?.Name))).length > 0 ? true : false;
    this.displayedColumns = this.gridColumns.map((col: any) => col?.Name);

    this.loading = true;
    this.getListItemCategory();
    // Grid End
  }

  // Grid Start
  applyFilter(event: Event) {

    this.loading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.gridConfig.SearchText = filterValue.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.getListItemCategory();
  }

  pageChange(e: PageEvent) {

    this.loading = true;
    this.gridConfig.PageSize = e?.pageSize || AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Offset = ((e?.pageIndex || 0) * this.gridConfig.PageSize);
    this.getListItemCategory(e.pageSize * e.pageIndex);
  }

  sortChange(e: Sort) {

    this.loading = true;
    this.gridConfig.SortBy = e?.active || 'ListItem';
    this.gridConfig.SortOrder = e?.direction || 'ASC';
    this.getListItemCategory();
  }

  setTableDataSource() {

    if (this.hasActions) { // add row data for actions
      this.gridData.forEach((data: any) => {
        if (!data['Actions']) {
          data['Actions'] = null;
        }
      });
    }

    this.dataSource = new MatTableDataSource<MvListItemCategory>(this.gridData);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  rowClick(row: MvListItemCategory) {

    this.selectedRow = { ...row };
    this.selection.toggle(row);
  }

  rowDblClick(row: MvListItemCategory) {

    this.selectedRow = { ...row };
    this.selection.toggle(row);

    if (this.navigationAction.includes('Edit')) {

      this.editClick();
    } else {

      this.us.openSnackBar('YouDontHaveAccess', 'info');
    }
  }
  // Grid End

  // Service Start
  getListItemCategory(currentSize?: number) {

    this.bs.getListItemCategory({ Option: this.gridConfig }, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

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

        this.setTableDataSource();
      });
  }
  // Service End

  rowActionClick(action: string, row: any) {

    if (action) {

      switch (action) {

        case 'Add':
          this.selectedRow = { ...row };
          this.selection.toggle(row);
          this.openDialog('Add');
          break;

        case 'Edit':
          this.selectedRow = { ...row };
          this.selection.toggle(row);
          this.openDialog('Edit');
          break;
      }
    }
  }


  addClick() {

    this.selection.clear();
    this.selectedRow = {} as MvListItemCategory;
    this.openDialog('Add');
  }

  editClick() {

    this.openDialog('Edit');
  }

  cancelClick() {

    this.bottomSheetRef.dismiss();
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

    const dialogRef = this.dialog.open(ListItemCategoryFormComponent, {
      disableClose: true,
      panelClass: 'list-item-category-form-dialog',
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
            this.us.swapArrayObject(response, this.gridData, 'ListItemCategoryId');
          } else {

            this.gridData.unshift(response);
            this.selectedRow = {} as MvListItemList;

          }

          this.setTableDataSource();
        }
      });
  }

  clearSearch() {

    this.loading = true;
    this.gridConfig.SearchText = '';
    this.searchText['nativeElement']['value'] = '';
    this.gridConfig.PageSize = AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Offset = 0;
    this.getListItemCategory();
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
