import { AccountService } from 'src/core/service/account.service';
import { MvNavigationActionList } from '../../../core/model/base.model';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/core/service/auth.service';

@Component({
  selector: 'nav-action',
  templateUrl: './nav-action.component.html',
  styleUrls: ['./nav-action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavActionComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  @Output() onActionClick = new EventEmitter<any>();

  @Input() isFloating = false; // floating actions

  navigationId: number;
  navigationAction: MvNavigationActionList[] = [];
  loading = true;

  constructor(private asr: AccountService,
    private auth: AuthService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.getNavigationAction();
  }

  getNavigationAction() {

    const navigationId = this.auth.getActiveInternalNavigationId();
    this.asr.getNavigationAction({ NavigationId: navigationId })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          let action = '';
          this.navigationAction = response?.Data || [];
          this.navigationAction.map((n: MvNavigationActionList) => {

            action = n.NavigationAction.toLowerCase();
            n.Class = action.includes('add') ? 'addFormId' : (action.includes('edit') ? 'editFormId' : '');
            n.Color = action.includes('add') ? 'primary' : (action.includes('edit') ? 'accent' : 'basic');
          });
        } else {

          this.navigationAction = [];
        }

        this.loading = false;
      });
  }

  navActionClick(nav: MvNavigationActionList) {

    this.onActionClick.emit({ ...nav });
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}