import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTileComponent } from './mat-tile.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    MatTileComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    NgxChartsModule
  ],
  providers: [

  ],
  exports: [
    MatTileComponent
  ]
})
export class MatTileModule {

}
