import { MvTile } from './../../../../shared/components/mat-tile/mat-tile.model';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { boxTilesStock, columnChart } from 'src/assets/data/tile-data';
import { Subject } from 'rxjs';
import { MvNavigationActionList } from 'src/core/model/base.model';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StockDashboardComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  boxTiles: MvTile[] = boxTilesStock;
  columnChart: MvTile[] = columnChart;

  constructor() {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

  }

  onActionClick(event: MvNavigationActionList) {

    if (event) {

      switch (event.NavigationAction) {

        case 'Refresh':
          this.getDashboard();
          break;
      }
    }
  }

  getDashboard() {

  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}