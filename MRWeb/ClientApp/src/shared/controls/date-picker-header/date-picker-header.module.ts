import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/core/service/account.service';
import { DatePickerHeaderComponent } from './date-picker-header.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DatePickerHeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    AccountService
  ],
  exports: [
    DatePickerHeaderComponent
  ]
})
export class DatePickerHeaderModule {

}
