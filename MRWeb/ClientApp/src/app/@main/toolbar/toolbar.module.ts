import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'src/shared/components/confirm-dialog/confirm-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
        MatToolbarModule,
        MatButtonModule,
        MatTabsModule,
        MatDialogModule,
        ConfirmDialogModule
    ],
    providers: [

    ],
    exports: [
        ToolbarComponent
    ]
})
export class ToolbarModule {

}
