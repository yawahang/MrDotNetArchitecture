import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { boxTilesSales, columnChart, barChart, lineChart } from 'src/assets/data/tile-data';
import { MvNavigationActionList } from 'src/core/model/base.model';
import { MvTile } from 'src/shared/components/mat-tile/mat-tile.model';

@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesDashboardComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  boxTiles: MvTile[] = boxTilesSales;
  columnChart: MvTile[] = columnChart;
  barChart: MvTile[] = barChart;
  lineChart: MvTile[] = lineChart;

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