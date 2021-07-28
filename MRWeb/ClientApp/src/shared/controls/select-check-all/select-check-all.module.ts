import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCheckAllComponent } from './select-check-all.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    SelectCheckAllComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatCheckboxModule,
    TranslateModule
  ],
  exports: [
    SelectCheckAllComponent
  ]
})
export class SelectCheckAllModule {

}
