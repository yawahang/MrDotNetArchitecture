import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridComponent } from './mat-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRowSelectionDirectiveModule } from 'src/core/direrctive/mat-row-selection/mat-row-selection.module';
import { AccountService } from 'src/core/service/account.service';
import { ResizableModule } from 'angular-resizable-element';
import { ConfirmDialogModule } from 'src/shared/components/confirm-dialog/confirm-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExcelExportService } from 'src/core/service/excel-export.service';

@NgModule({
  declarations: [
    MatGridComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatMenuModule,
    MatRowSelectionDirectiveModule,
    MatCheckboxModule,
    MatIconModule,
    ResizableModule,
    DragDropModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    ConfirmDialogModule
  ],
  providers: [
    AccountService,
    ExcelExportService
  ],
  exports: [
    MatGridComponent
  ]
})
export class MatGridModule {

}
