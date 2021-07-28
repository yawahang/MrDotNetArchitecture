import { AccountService } from 'src/core/service/account.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavActionComponent } from './nav-action.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NavActionComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    TranslateModule,
    MatButtonModule
  ],
  providers: [
    AccountService
  ],
  exports: [
    NavActionComponent
  ]
})
export class NavActionModule {

}
