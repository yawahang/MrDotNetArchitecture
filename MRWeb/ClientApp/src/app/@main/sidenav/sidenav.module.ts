import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from 'src/core/service/account.service';
import { RoleSwitchModule } from 'src/shared/components/role-switch/role-switch.module';
import { DataAccessModule } from '../data-access/data-access.module';

@NgModule({
    declarations: [
        SidenavComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        TranslateModule,
        MatMenuModule,
        MatCardModule,
        RoleSwitchModule,
        DataAccessModule
    ],
    providers: [
        AccountService
    ],
    exports: [
        SidenavComponent
    ]
})
export class SideNavModule {

}
