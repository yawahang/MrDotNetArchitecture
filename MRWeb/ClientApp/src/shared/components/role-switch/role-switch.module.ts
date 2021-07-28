import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSwitchComponent } from './role-switch.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { AccountService } from 'src/core/service/account.service';

@NgModule({
  declarations: [
    RoleSwitchComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    TranslateModule,
    MatTooltipModule
  ],
  providers: [
    AccountService
  ],
  exports: [
    RoleSwitchComponent
  ],
})
export class RoleSwitchModule {

}
