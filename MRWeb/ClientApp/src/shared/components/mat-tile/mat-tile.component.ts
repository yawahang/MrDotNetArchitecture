import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { MvTile } from './mat-tile.model';

@Component({
  selector: 'mat-tile',
  templateUrl: './mat-tile.component.html',
  styleUrls: ['./mat-tile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatTileComponent implements OnInit, OnDestroy {

  @Input('data') set data(data: MvTile) {

    if (data) {

      this.tile = data;
    }
  }

  tile: MvTile;

  colorScheme = {
    domain: ['#A10A28', '#C7B42C', '#AAAAAA', '#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {

  }

  ngOnInit() {

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnDestroy(): void {

  }
}
