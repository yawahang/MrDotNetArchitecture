import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { boxTilesStock, columnChartV } from 'src/assets/data/tile-data';
import { MvNavigationActionList } from 'src/core/model/base.model';
import { MvTile } from 'src/shared/components/mat-tile/mat-tile.model';

@Component({
  selector: 'app-cash-management-dashboard',
  templateUrl: './cash-management-dashboard.component.html',
  styleUrls: ['./cash-management-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CashManagementDashboardComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  boxTiles: MvTile[] = boxTilesStock;
  columnChartV: MvTile[] = columnChartV;

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