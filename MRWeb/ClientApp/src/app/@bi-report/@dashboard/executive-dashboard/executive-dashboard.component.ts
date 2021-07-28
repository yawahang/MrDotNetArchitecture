import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { boxTilesStock, donutPieChart } from 'src/assets/data/tile-data';
import { MvNavigationActionList } from 'src/core/model/base.model';
import { MvTile } from 'src/shared/components/mat-tile/mat-tile.model';

@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss']
})
export class ExecutiveDashboardComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  boxTiles: MvTile[] = boxTilesStock;
  donutPieChart: MvTile[] = donutPieChart;

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