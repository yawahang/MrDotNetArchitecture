import { MatGridModule } from './../../../../shared/controls/mat-grid/mat-grid.module';
import { NavActionModule } from '../../../../shared/components/nav-action/nav-action.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { BaseService } from 'src/core/service/base.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RoleNavigationComponent } from './role-navigation/role-navigation.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RoleFormComponent } from './role-form/role-form.component';
import { SelectCheckAllModule } from 'src/shared/controls/select-check-all/select-check-all.module';
import { TreeViewModule } from 'src/shared/controls/tree-view/mr-tree-view.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent
  }
];

@NgModule({
  declarations: [
    RoleComponent,
    RoleNavigationComponent,
    RoleFormComponent
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
    MatTooltipModule,
    TranslateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NavActionModule,
    MatGridModule,
    SelectCheckAllModule,
    TreeViewModule,
    MatAutocompleteModule
  ],
  providers: [
    BaseService
  ],
  exports: [
    RoleComponent
  ]
})
export class RoleModule {

}
