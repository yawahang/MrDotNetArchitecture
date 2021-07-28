import { AccountService } from 'src/core/service/account.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { MvUserProfile } from './user-profile.model';
import { AppConst } from 'src/app/app.config';
import { AuthService } from 'src/core/service/auth.service';
import { UtilityService } from 'src/core/service/utility.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;

  private _unsubscribeAll: Subject<any>;

  loading = false;
  userProfile: MvUserProfile = <MvUserProfile>{};

  constructor(public asr: AccountService,
    public dialog: MatDialog,
    public auth: AuthService,
    private us: UtilityService) {

    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.userProfile.ProfileImage = AppConst.Data?.ProfileImgUrl;
    this.getUserProfile();
    this.loading = true;
  }

  getUserProfile() {

    this.asr.getUserProfile()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {

        if (response && response?.Data && response?.Data[0]) {

          this.userProfile = response?.Data[0];
          this.userProfile.ProfileImage = this.userProfile.ProfileImage || AppConst.Data?.ProfileImgUrl;

        } else {

          this.userProfile = {} as MvUserProfile;
        }

        this.loading = false;
      });
  }

  editClick() {

    const dialogRef = this.dialog.open(UserProfileFormComponent, {
      disableClose: true,
      panelClass: 'user-profile-form-dialog',
      data: {
        data: { ...this.userProfile }
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: MvUserProfile) => {

        if (response) {

          this.userProfile = { ...response };

          let name = this.userProfile.FirstName;
          if (this.userProfile.MiddleName) {
            name += ` ${this.userProfile.MiddleName}`;
          }
          name += ` ${this.userProfile.LastName}`;
          this.auth.setLocalStorage('Name', name);
          this.auth.subProfileChanged.next(true);
        }
      });
  }

  onImageChange(evt: any) {

    const isImageFile = !!evt.target.files[0].name.match(/(.png|.jpg|.jpeg)/);

    if (evt.target?.files?.length > 1) {

      this.inputFile.nativeElement.value = '';
      this.us.openSnackBar('SelectOneFile', 'error');
      return;
    }

    // add image side validation (Max 1Mb allowed)

    if (isImageFile) {

      const file = evt.target.files[0];

      if ((file?.size / 125000) > 5) { // 5Mb file size limit

        this.inputFile.nativeElement.value = '';
        this.us.openSnackBar('MaxFileSize5Mb', 'warning');
        return;
      }

      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e: any) => {

        this.userProfile.ProfileImage = e?.srcElement?.result;
        this.saveProfileImage();
      }
    } else {

      this.inputFile.nativeElement.value = '';
      this.us.openSnackBar('SelectAnImageFile', 'error');
    }
  }

  saveProfileImage() {

    if (!this.userProfile.ProfileImage || this.userProfile.ProfileImage === '') {

      this.auth.setLocalStorage('ProfileImage', null);
      this.auth.subAuthenticated.next(true);
    } else {

      this.loading = true;
      this.asr.profileImageUpd({ ProfileImage: this.userProfile.ProfileImage })
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: any) => {

          this.loading = false;
          if (response) {

            this.auth.setLocalStorage('ProfileImage', this.userProfile.ProfileImage);
            this.auth.subProfileChanged.next(true);
            this.us.openSnackBar('ProfileImageUploaded', 'success');
          } else {

            this.us.openSnackBar('SomethingWentWrong', 'error');
          }
        });
    }
  }
}
