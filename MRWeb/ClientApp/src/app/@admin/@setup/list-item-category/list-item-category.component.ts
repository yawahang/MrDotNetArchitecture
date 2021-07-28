import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MvListItemCategory, MvNavigationActionList } from 'src/core/model/base.model';
import { BaseService } from 'src/core/service/base.service';
import { UtilityService } from 'src/core/service/utility.service';
import { AppConst } from 'src/app/app.config';
import { gridColumns } from './list-item-category-column';
import { MvGridConfig, MvGridPaging } from 'src/shared/controls/mat-grid/mat-grid.model';
import { ListItemCategoryFormComponent } from './list-item-category-form/list-item-category-form.component';

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
  gridConfig = {
    Columns: [],
    Data: {
      Data: [],
      TotalRows: 0
    },
    Loading: true,
    FileName: 'ListItemCategory_Export',
    Option: {
      SearchText: '',
      Offset: 0,
      PageSize: 10,
      SortBy: 'Category',
      SortOrder: 'ASC'
    },
    RowActionOption: {
      DblClickNavigationAction: 'Edit'
    }
  } as MvGridConfig;

  selectedRow: MvListItemCategory = <MvListItemCategory>{};
  // Grid End

  constructor(
    private bs: BaseService,
    public dialog: MatDialog,
    private us: UtilityService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.gridConfig.Columns = gridColumns;
    this.getListItemCategory();
  }

  getListItemCategory() {

    this.gridConfig.Loading = true;
    this.gridConfig = { ...this.gridConfig }; // refresh gridConfig  
    const param = {
      Option: this.gridConfig.Option
    };
    this.bs.getListItemCategory(param)
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
    this.getListItemCategory();
  }

  // Grid Start 
  onRowDblClick(row: MvListItemCategory) {

    this.selectedRow = { ...row };
    this.openDialog('Edit');
  }

  onRowClick(row: MvListItemCategory) {

    this.selectedRow = { ...row };
  }

  onPageChange(event: MvGridPaging) {

    if (event) {

      this.gridConfig.Option.Offset = event.Offset;
      this.gridConfig.Option.PageSize = event.PageSize;
      this.getListItemCategory();
    }
  }

  onSortChange(event: MvGridPaging) {

    if (event) {

      this.gridConfig.Option.SortBy = event.SortBy;
      this.gridConfig.Option.SortOrder = event.SortOrder;
      this.getListItemCategory();
    }
  }

  onRowActionClick(event: any) {

    if (event && event?.action && event?.row) {

      this.selectedRow = { ...event?.row };
      switch (event?.action?.NavigationAction) {

        case 'Edit':
          this.openDialog('Edit');
          break;
      }
    }
  }
  // Grid End

  onActionClick(event: MvNavigationActionList) {

    if (event) {

      switch (event.NavigationAction) {

        case 'Refresh':
          this.getListItemCategory();
          break;
        case 'Add':
          this.selectedRow = {} as MvListItemCategory;
          this.openDialog('Add');
          break;
        case 'Edit':
          this.openDialog('Edit');
          break;
      }
    }
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
            this.us.swapArrayObject(response, this.gridConfig.Data.Data, 'ListItemCategoryId');
          } else {

            this.selectedRow = {} as MvListItemCategory;
            this.gridConfig.Data.Data.unshift(response);
          }

          this.gridConfig = { ...this.gridConfig }; // refresh gridConfig 
        }
      });
  }

  clearSearch() {

    this.gridConfig.Option.SearchText = '';
    this.searchText['nativeElement']['value'] = '';
    this.gridConfig.Option.PageSize = AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Option.Offset = 0;
    this.getListItemCategory();
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
