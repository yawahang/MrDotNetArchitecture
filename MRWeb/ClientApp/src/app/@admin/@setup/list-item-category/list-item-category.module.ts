import { NavActionModule } from '../../../../shared/components/nav-action/nav-action.module';
import { TranslateModule } from "@ngx-translate/core";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Routes, RouterModule } from "@angular/router";
import { BaseService } from "src/core/service/base.service";
import { ListItemCategoryComponent } from "../list-item-category/list-item-category.component";
import { MatGridModule } from 'src/shared/controls/mat-grid/mat-grid.module';
import { SelectCheckAllModule } from 'src/shared/controls/select-check-all/select-check-all.module';
import { ListItemCategoryFormComponent } from './list-item-category-form/list-item-category-form.component';

const routes: Routes = [
    {
        path: '',
        component: ListItemCategoryComponent
    },
];

@NgModule({
    declarations: [
        ListItemCategoryComponent,
        ListItemCategoryFormComponent
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
        TranslateModule,
        NavActionModule,
        MatGridModule,
        SelectCheckAllModule
    ],
    providers: [
        BaseService
    ],
    exports: [
        ListItemCategoryComponent
    ],
})
export class ListItemCategoryModule {

}
