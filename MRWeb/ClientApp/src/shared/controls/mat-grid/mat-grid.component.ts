import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConst } from 'src/app/app.config';
import { MvNavigationActionList } from 'src/core/model/base.model';
import { AccountService } from 'src/core/service/account.service';
import { AuthService } from 'src/core/service/auth.service';
import { UtilityService } from 'src/core/service/utility.service';
import { MvGridColumn, MvGridConfig } from './mat-grid.model';
import { ResizeEvent } from 'angular-resizable-element';
import { ConfirmDialogComponent } from 'src/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ExcelExportService, MvExcelExportOption } from 'src/core/service/excel-export.service';

@Component({
  selector: 'mat-grid',
  templateUrl: './mat-grid.component.html',
  styleUrls: ['./mat-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatGridComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  @Output() onPageChange = new EventEmitter<any>();
  @Output() onSortChange = new EventEmitter<any>();
  @Output() onRowClick = new EventEmitter<any>();
  @Output() onRowActionClick = new EventEmitter<any>();
  @Output() onRowDblClick = new EventEmitter<any>();
  @Output() onCheckAll = new EventEmitter<any>();
  @Output() onCheckBoxChange = new EventEmitter<any>();

  @Input('config') set config(conf: MvGridConfig) {

    if (conf) {

      if (conf.Data.Data.length) {

        if (typeof this.currentSize === 'number') { // fetch next

          this.gridData.length = this.currentSize;
          this.gridData.push(...conf.Data.Data);
          this.gridData.length = conf.Data.TotalRows;
        } else {

          this.gridData = conf.Data.Data;
          this.gridData.length = conf.Data.TotalRows;
        }
      } else {

        this.gridData = [];
        this.gridData.length = 0;
      }

      this.gridColumns = conf.Columns;

      const stickyCol = this.gridColumns.filter((col: MvGridColumn) => col?.Sticky);
      if (stickyCol && stickyCol.length > 0) {
        this.isSticky = true;
      }

      const disableSort = this.gridColumns.filter((col: MvGridColumn) => col?.DisableSort);
      if (disableSort && disableSort.length > 0) {
        this.isSortable = false;
      }

      this.actionColumns = this.gridColumns.filter((col: MvGridColumn) => (col?.Type === 'Action')).map((col: any) => col?.Name);
      if (this.displayedColumns.length === 0) { // affects column order if re-assigned
        this.displayedColumns = this.gridColumns.map((col: any) => col?.Name);
      }

      this.checkColumns = this.gridColumns.filter((col: any) => (col?.Type === 'CheckBox')).map((col: any) => col?.Name);

      if (!this.selection) {

        if (this.checkColumns.length > 0) {
          this.selection = new SelectionModel<any>(true, []);
        } else {
          this.selection = new SelectionModel<any>(false, []);
        }
      }

      if (!this.gridConfig) { // grid initialization

        this.gridConfig = { ...conf };
        if (conf.RowActionOption) {

          this.dblClickNavigationAction = conf.RowActionOption.DblClickNavigationAction;
          this.getNavigationAction();
        }
      }

      if (this.gridConfig.Option.SearchText !== conf.Option.SearchText) { // grid search change
        this.dataSource.paginator.firstPage();
      }

      this.gridConfig.Option = conf.Option;
      this.gridConfig.RowActionOption = conf.RowActionOption;
      this.gridConfig.FileName = conf.FileName;

      this.rowTooltip = conf.RowTooltip || this.rowTooltip;
      this.loading = conf.Loading;
      this.setTableDataSource();
    }
  }

  @Input('rowTemplateOption') set rowTemplateOption(tpl: any) {

    if (tpl) {

      this.rowTemplate = tpl;
    }
  }

  rowTemplate = {};

  @ViewChild('tableEl', { static: true }) tableEl: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  gridColumns: MvGridColumn[];
  dataSource: MatTableDataSource<any>;
  gridData: any[] = [];

  totalRows: number;
  selection: SelectionModel<any>;
  gridConfig: MvGridConfig<any>;

  isSticky = false;
  isSortable = true;
  displayedColumns: string[] = [];
  actionColumns: string[] = [];
  checkColumns: string[] = [];
  gridColumnOption: any;
  pageSizeOptions: number[] = [];
  noRecordMessage = '';
  selectedRow: any = <any>{};
  loading = true;
  currentSize: any;

  navigationAction: MvNavigationActionList[] = [];
  dblClickNavigationAction: string;
  gridRowActionExpanded = false; // true = inline icon actions, false = menu actions

  rowTooltip = '';

  // Column Resize 
  @ViewChild(MatTable, { static: true, read: ElementRef }) private matTableRef: ElementRef;
  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;
  // Column Resize 

  constructor(
    public dialog: MatDialog,
    private asr: AccountService,
    private us: UtilityService,
    private auth: AuthService,
    private xlssrv: ExcelExportService,
    private renderer: Renderer2) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    // Grid Start
    this.gridColumnOption = AppConst.Data.GridOptions.GridColumnOption;
    this.noRecordMessage = AppConst.Data.GridOptions.NoRecordMessage;
    this.pageSizeOptions = AppConst.Data.GridOptions.PageSizeOptions;
    this.gridRowActionExpanded = this.auth.getLocalStorage('GridRowActionExpanded');
  }

  pageChange(e: PageEvent) {

    this.loading = true;
    this.gridConfig.Option.PageSize = e?.pageSize || AppConst.Data.GridOptions.PageSize;
    this.gridConfig.Option.Offset = ((e?.pageIndex || 0) * this.gridConfig.Option.PageSize);
    this.currentSize = e.pageSize * e.pageIndex;
    this.onPageChange.emit({
      Offset: this.gridConfig.Option.Offset,
      PageSize: this.gridConfig.Option.PageSize
    });
  }

  sortChange(e: Sort) {

    this.loading = true;
    this.gridConfig.Option.SortBy = e?.active || this.gridConfig.Option.SortBy;
    this.gridConfig.Option.SortOrder = e?.direction || 'ASC';
    this.onSortChange.emit({
      SortBy: this.gridConfig.Option.SortBy,
      SortOrder: this.gridConfig.Option.SortOrder
    });
  }

  setTableDataSource() {

    if (this.actionColumns.length > 0) { // add row data for actions
      this.gridData.forEach((data: any) => {
        this.actionColumns.forEach((col: string) => {
          data[col] = null;
        });
      });
    }

    if (this.checkColumns.length > 0) { // check columns, select checked rows

      this.gridData.forEach(row => this.selection.select(row));
      this.onCheckAll.emit(this.selection.selected);
    }

    this.dataSource = new MatTableDataSource<any>(this.gridData);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  rowClick(row: any) {

    this.selectedRow = { ...row };
    this.selection.toggle(row);
    this.onRowClick.emit({ ...row });
  }

  rowActionClick(nav: MvNavigationActionList, row: any) {

    if (nav && row) {

      this.selectedRow = { ...row };
      this.selection.toggle(row);
      this.onRowActionClick.emit({
        action: { ...nav },
        row: { ...row }
      });
    }
  }

  rowDblClick(row: any) {

    const navAccess = this.navigationAction.filter((n: MvNavigationActionList) => n.NavigationAction === this.dblClickNavigationAction);
    if (navAccess && navAccess.length > 0) {

      this.selectedRow = { ...row };
      this.selection.toggle(row);
      this.onRowDblClick.emit({ ...row });
    } else {

      this.us.openSnackBar('YouDontHaveAccess', 'info');
    }
  }

  getNavigationAction() {

    const navigationId = this.auth.getActiveInternalNavigationId();
    this.asr.getNavigationAction({ NavigationId: navigationId })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          this.navigationAction = (response?.Data || []).filter((n: MvNavigationActionList) => n.ShowInGrid);
          let action = '';
          this.navigationAction.map((n: MvNavigationActionList) => {

            action = n.NavigationAction.toLowerCase();
            n.Color = action.includes('add') ? 'primary' : (action.includes('edit') ? 'accent' : 'basic');
          });
        } else {

          this.navigationAction = [];
        }
      });
  }

  checkBoxChange(row: any) {

    if (row) {

      this.selection.toggle(row);
      this.onCheckBoxChange.emit(this.selection.selected);
    }
  }

  // Whether the number of selected elements matches the total number of rows
  isAllSelected() {

    const numSelected = this.selection.selected.length;
    return numSelected === this.totalRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection
  checkAll() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource?.data.forEach(row => this.selection.select(row));
    this.onCheckAll.emit(this.selection.selected);
  }

  rowActionHeaderClick() {

    this.gridRowActionExpanded = !this.gridRowActionExpanded;
    this.asr.setUserSetting({ GridRowActionExpanded: this.gridRowActionExpanded }, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {

        if (response && response?.Data && response?.Data[0]) {

          this.auth.setLocalStorage('GridRowActionExpanded', this.gridRowActionExpanded);
        } else {

          this.us.openSnackBar('SwitchApplicationFailed', 'error');
        }
      });
  }

  // Column Resize  
  onResizeEnd(event: ResizeEvent, columnName): void {

    if (event.edges.right) {

      const cssValue = event.rectangle.width + 'px';
      const columnElts = document.getElementsByClassName('mat-column-' + columnName);
      for (let i = 0; i < columnElts.length; i++) {

        const currentEl = columnElts[i] as HTMLDivElement;
        currentEl.style.width = cssValue;
      }
    }
  }
  // Column Resize 

  // Column ReOrder 
  columnDrop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
  // Column ReOrder

  excelExportClick() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      panelClass: 'confirm-dialog-wrapper',
      data: {
        title: 'ExportToExcel',
        message: 'ExportToExcelMessage',
        yesBtnText: 'Yes',
        noBtnText: 'No'
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        let excelOpt: MvExcelExportOption = {} as MvExcelExportOption;
        excelOpt.FileName = this.gridConfig.FileName || 'Excel_Export_File';
        excelOpt.SheetName = this.gridConfig.SheetName || 'Sheet1';

        if (response) { // ExportAsRawExcel

          excelOpt.Data = this.gridConfig.Data.Data || [];
          this.xlssrv.exportAsExcel(excelOpt);
        }
      });
  }

  ngOnDestroy(): void {

  }
}

