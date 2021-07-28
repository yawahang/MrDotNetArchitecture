import { SelectCheckAllModule } from './../../../../shared/controls/select-check-all/select-check-all.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BaseService } from 'src/core/service/base.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserRoleListGridComponent } from './user-role-list-grid/user-role-list-grid.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { ConfirmDialogModule } from 'src/shared/components/confirm-dialog/confirm-dialog.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NavActionModule } from 'src/shared/components/nav-action/nav-action.module';
import { MatGridModule } from 'src/shared/controls/mat-grid/mat-grid.module';

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  declarations: [
    UserComponent,
    UserRoleListGridComponent,
    UserFormComponent,
    PasswordResetFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatBottomSheetModule,
    TranslateModule,
    ConfirmDialogModule,
    MatAutocompleteModule,
    CdkTableModule,
    MatCheckboxModule,
    NavActionModule,
    MatGridModule,
    SelectCheckAllModule
  ],
  providers: [
    BaseService,
    {
      provide: MAT_DATE_FORMATS,
      useValue: CUSTOM_DATE_FORMATS
    }
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule {

}
