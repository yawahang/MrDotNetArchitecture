import { MvCulture } from './../../../../../core/model/base.model';
import { MvCompany } from './../../../@entity/company/company.model';
import { AccountService } from 'src/core/service/account.service';
import { MvUser } from '../user.model';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseService } from 'src/core/service/base.service';
import { UtilityService } from 'src/core/service/utility.service';
import { MvListItem } from 'src/core/model/base.model';
import { CustomValidationService } from 'src/core/service/custom-validation.service';
import { MvOffice } from 'src/app/@admin/@entity/office/office.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  action: string;
  selectedModel: MvUser = <MvUser>{};
  fmUser: FormGroup;
  statusList: MvListItem[] = [];
  cultureList: MvCulture[] = [];
  companyList = [];
  companyFilteredOptions: Observable<MvCompany[]>;
  officeList = [];
  officeFilteredOptions: Observable<MvOffice[]>;

  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public bs: BaseService,
    public asr: AccountService,
    private us: UtilityService) {

    this._unsubscribeAll = new Subject();
    this.action = data?.action;
    this.selectedModel = <MvUser>data?.data;
  }

  ngOnInit() {

    this.getStatusList();
    this.getCultureList();
    this.initForm();
  }

  initForm() {

    this.fmUser = this.fb.group({
      Username: [this.selectedModel.Username, [Validators.required, CustomValidationService.emailValidator]],
      FirstName: [this.selectedModel.FirstName, Validators.required],
      MiddleName: [this.selectedModel.MiddleName],
      LastName: [this.selectedModel.LastName, Validators.required],
      Company: [this.selectedModel.Company, Validators.required],
      Office: [this.selectedModel.Office, Validators.required],
      CultureId: [this.selectedModel.CultureId, Validators.required],
      StatusListItemId: [this.selectedModel.StatusListItemId, Validators.required]
    });

    // Office
    this.getOffice(false);
    // Company
    this.getCompany(false);
  }

  cancelClick() {
    this.dialogRef.close();
  }

  submitForm() {

    this.us.formUtility(this.fmUser, 'validate');
    if (!this.fmUser.pristine || this.fmUser.valid) {

      let value = this.us.formUtility(this.fmUser, 'value');
      value['UserId'] = this.selectedModel.UserId || 0;
      value['CompanyId'] = this.selectedModel.CompanyId || 0;
      value['OfficeId'] = this.selectedModel.OfficeId || 0;
      delete value['Company'];
      delete value['Office'];

      if (this.action === 'Add') {

        const param = { Username: value?.Username };
        this.asr.getExistingUsername(param, true)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(response => {

            if (response && response?.Data && response?.Data[0]) {

              this.us.openSnackBar('UsernameAlreadyExists', 'warning');
            } else {

              this.saveUser(value)
            }
          });
      } else {

        this.saveUser(value)
      }
    } else {

      this.us.openSnackBar('InvalidForm', 'warning');
    }
  }

  saveUser(param: any) {

    this.asr.setUser(param, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response && response?.Data && response?.Data[0]) {

          this.dialogRef.close(response?.Data[0]);
          this.us.openSnackBar('FormSaved', 'success');
        } else {

          this.us.openSnackBar('FormSaveFailed', 'error');
        }
      });
  }

  getStatusList() {

    this.bs.getListItemList({ Category: 'Status' }, true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          this.statusList = response?.Data || [];

          if (this.action === 'Add') {

            const active = this.statusList.filter((val: any) => (val?.ListItem === 'Active'));
            if (active && active[0]) {
              this.fmUser.get('StatusListItemId').setValue(active[0]['ListItemId'], { emitEvent: false });
            }
          }
        } else {

          this.statusList = [];
        }
      });
  }

  getCultureList() {

    this.bs.getCulture({})
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response) {

          this.cultureList = response?.Data || [];

          if (this.action === 'Add') {

            const eng = this.cultureList.filter((val: any) => (val?.Culture === 'en'));
            if (eng && eng[0]) {
              this.fmUser.get('CultureId').setValue(eng[0]['CultureId'], { emitEvent: false });
            }
          }
        } else {

          this.cultureList = [];
        }
      });
  }

  officeSearch() {

    this.getOffice(this.fmUser.get('Office').value || '');
  }

  getOffice(showLoader = true, searchText?: string) {

    this.officeList = [];
    const param = {
      Option: {
        Filter: {
          Status: 'Active'
        },
        SearchText: searchText,
        Offset: 0,
        PageSize: 10,
        SortBy: 'Office',
        SortOrder: 'ASC'
      }
    };
    this.bs.getOffice(param, showLoader)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response && response?.Data) {
          this.officeList = response?.Data || [];
        }

        this.officeFilteredOptions = this.fmUser.get('Office').valueChanges.pipe(startWith(''), map(value => this.officeFilter(value)));
      });
  }

  officeFilter(value: string): MvOffice[] {

    const filterValue = value.toLowerCase();
    const filteredData = this.officeList.filter((option: MvOffice) => (option.Office || '').toLowerCase().includes(filterValue));
    return filteredData;
  }

  officeSelection(event: any) {

    if (event?.option?.value) {

      const office = this.officeList.filter((row: MvOffice) => row.Office === event?.option?.value);
      if (office && office[0]) {

        this.selectedModel.OfficeId = office[0]['OfficeId'];
      }
    } else {

      this.selectedModel.OfficeId = null;
    }
  }

  companySearch() {

    this.getCompany(this.fmUser.get('Company').value || '');
  }

  getCompany(showLoader = true, searchText?: string) {

    this.companyList = [];
    const param = {
      Option: {
        Filter: {
          Status: 'Active'
        },
        SearchText: searchText,
        Offset: 0,
        PageSize: 10,
        SortBy: 'Company',
        SortOrder: 'ASC'
      }
    };
    this.bs.getCompany(param, showLoader)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {

        if (response && response?.Data) {
          this.companyList = response?.Data || [];
        }

        this.companyFilteredOptions = this.fmUser.get('Company').valueChanges.pipe(startWith(''), map(value => this.companyFilter(value)));
      });
  }

  companyFilter(value: string): MvCompany[] {

    const filterValue = value.toLowerCase();
    const filteredData = this.companyList.filter((option: MvCompany) => (option.Company || '').toLowerCase().includes(filterValue));
    return filteredData;
  }

  companySelection(event: any) {

    if (event?.option?.value) {

      const office = this.companyList.filter((row: MvCompany) => row.Company === event?.option?.value);
      if (office && office[0]) {

        this.selectedModel.CompanyId = office[0]['CompanyId'];
      }
    } else {

      this.selectedModel.CompanyId = null;
    }
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
