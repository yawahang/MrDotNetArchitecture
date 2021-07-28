import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { AccountService } from 'src/core/service/account.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAccessComponent } from './data-access.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeViewModule } from 'src/shared/controls/tree-view/mr-tree-view.module';

@NgModule({
  declarations: [
    DataAccessComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
    TreeViewModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    AccountService
  ],
  exports: [
    DataAccessComponent
  ]
})
export class DataAccessModule {

}
