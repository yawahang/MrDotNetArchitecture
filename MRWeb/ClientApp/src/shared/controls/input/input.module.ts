import { EnterKeyFocusDirectiveModule } from 'src/core/direrctive/enter-key-focus/enter-key-focus.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    TranslateModule,
    MatFormFieldModule,
    FormsModule,
    EnterKeyFocusDirectiveModule
  ],
  exports: [
    InputComponent
  ]
})
export class MrInputModule {

}
