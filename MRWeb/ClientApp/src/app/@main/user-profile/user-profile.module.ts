import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BaseService } from 'src/core/service/base.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogModule } from 'src/shared/components/confirm-dialog/confirm-dialog.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserProfileComponent } from './user-profile.component';
import { DatePickerHeaderModule } from 'src/shared/controls/date-picker-header/date-picker-header.module';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  }
];

export const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
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

@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
    TranslateModule,
    MatSlideToggleModule,
    DatePickerHeaderModule,
    ConfirmDialogModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  providers: [
    BaseService,
    {
      provide: MAT_DATE_FORMATS,
      useValue: CUSTOM_DATE_FORMATS
    }
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule {

}
