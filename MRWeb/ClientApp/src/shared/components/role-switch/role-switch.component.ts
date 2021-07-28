import { UtilityService } from '../../../core/service/utility.service';
import { AuthService } from 'src/core/service/auth.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/core/service/account.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-role-switch',
  templateUrl: './role-switch.component.html',
  styleUrls: ['./role-switch.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleSwitchComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  currentRoleId: number;
  roleList: any[];

  constructor(public dialogRef: MatDialogRef<RoleSwitchComponent>,
    public auth: AuthService,
    public acc: AccountService,
    public us: UtilityService) {
    dialogRef.disableClose = true;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.currentRoleId = this.auth.getLocalStorage('CurrentRoleId') | 0;
    this.roleList = this.auth.getLocalStorage('Role') || [];
  }

  roleChange(e: any) {

    if (e) {

      this.acc.setUserDefault({ CurrentRoleId: e?.value }, true)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: any) => {

          if (response && response?.Data && response?.Data[0]) {

            this.auth.setLocalStorage('CurrentRoleId', e?.value || 0);
            this.auth.setLocalStorage('Navigation', response?.Data[0]?.Navigation || []);
            this.auth.setLocalStorage('Role', response?.Data[0]?.Role || []);
            this.us.openSnackBar('RoleSwitched', 'success');
            window.location.reload();
          } else {

            this.us.openSnackBar('SwitchRoleFailed', 'error');
          }

          this.dialogRef.close();
        });
    }
  }

  cancelClick() {

    this.dialogRef.close();
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
