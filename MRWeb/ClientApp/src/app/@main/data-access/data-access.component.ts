import { UtilityService } from 'src/core/service/utility.service';
import { AccountService } from 'src/core/service/account.service';
import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/core/service/auth.service';
import { MvTreeConfig, MvCheckedNode, MvTree } from 'src/shared/controls/tree-view/tree-view.model';

@Component({
  selector: 'app-data-access',
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataAccessComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  treeViewConfig = {
    Expanded: true,
    Searchable: true,
    ReturnValueOnInit: true,
    Data: []
  } as MvTreeConfig;

  fmDataAccess: FormGroup;
  office: string;
  userId: number;
  defaultOfficeId: number;
  officeList: MvCheckedNode[] = [];
  officeFilteredOptions: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<DataAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private acc: AccountService,
    private us: UtilityService,
    public auth: AuthService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.userId = this.auth.getLocalStorage('UserId');
    this.defaultOfficeId = this.auth.getLocalStorage('DefaultOfficeId');
    this.fmDataAccess = this.fb.group({
      DefaultOffice: [null, Validators.required]
    });
    this.getDataAccess();
  }

  officeSearch() {

    this.getOffice(this.fmDataAccess.get('DefaultOffice').value || '');
  }

  getOffice(searchText?: string) {

    this.officeFilteredOptions = this.fmDataAccess.get('DefaultOffice').valueChanges.pipe(startWith(''), map(value => this.officeFilter(value)));
  }

  officeFilter(value: string): MvCheckedNode[] {

    const filterValue = value.toLowerCase();
    const filteredData = this.officeList.filter((option: MvCheckedNode) => (option.Node || '').toLowerCase().includes(filterValue));
    return filteredData;
  }

  officeSelection(event: any) {

    if (event?.option?.value) {

      const office = this.officeList.filter((row: MvCheckedNode) => row.Node === event?.option?.value);
      if (office && office[0]) {

        const oldOfficeId = this.defaultOfficeId;
        this.defaultOfficeId = office[0]?.EnityId;
        this.fmDataAccess.get('DefaultOffice').setValue(office[0]?.Node);
        this.treeViewConfig.Data.map((n: MvTree) => {

          const selected = this.officeList.filter((o: MvCheckedNode) => o.NodeId === n.NodeId);
          if (selected && selected.length > 0) {
            n.Checked = true;
          } else {
            n.Checked = false;
          }

          if (n.EnityId === oldOfficeId && n.EnityType === 'Office') {
            n.Disabled = false;
          }

          if (n.EnityId === this.defaultOfficeId && n.EnityType === 'Office') {
            n.Disabled = true;
          }
        });

        this.treeViewConfig = { ...this.treeViewConfig };
      }
    } else {

      this.defaultOfficeId = null;
      this.fmDataAccess.get('DefaultOffice').setValue(null);
    }
  }

  getDataAccess() {

    this.acc.getDataAccess({}, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (response && response?.Data && response?.Data[0]) {

          this.treeViewConfig.Data = response?.Data;
        } else {

          this.treeViewConfig.Data = [];
        }
      });
  }

  treeViewChange(e: any): void {

    this.officeList = e;

    const defaultOff = this.officeList.filter((o: MvTree) => (o.EnityId === this.defaultOfficeId && o.EnityType === 'Office'));
    if (defaultOff && defaultOff.length > 0) {

      this.fmDataAccess.get('DefaultOffice').setValue(defaultOff[0]?.Node);
    }

    this.getOffice();
  }

  cancelClick() {

    this.dialogRef.close();
  }

  saveDataAccess() {

    this.us.formUtility(this.fmDataAccess, 'validate');
    if (this.fmDataAccess.valid && this.defaultOfficeId) {

      let access: any = this.officeList.filter((o: MvTree) => o.EnityType === 'Office');
      access = access.map((c: MvCheckedNode) => {
        return {
          OfficeId: c.EnityId,
          Checked: c.Checked
        };
      });

      this.acc.setDataAccess({
        Location: 'User',
        Data: [
          {
            DefaultOfficeId: this.defaultOfficeId,
            UserId: this.userId,
            Access: access
          }
        ]
      }, true)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: any) => {

          if (response && response?.Data && response?.Data[0]) {

            this.auth.setLocalStorage('DefaultOfficeId', this.defaultOfficeId);
            this.us.openSnackBar('DataAccessChanged', 'success');
          } else {

            this.us.openSnackBar('DataAccessFailed', 'error');
          }

          this.dialogRef.close();
        });
    } else {

      this.us.openSnackBar('SelectDefaultOffice', 'warning');
    }
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
