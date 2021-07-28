import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class CustomIconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
  }

  register() {

    this.matIconRegistry.addSvgIcon(
      'file-check-box',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/file-check-box.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file-excel',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/file-excel.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file-image',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/file-image.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file-pdf',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/file-pdf.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file-report-charts',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/file-report-charts.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file-report-setting',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/file-report-setting.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file-report-table',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/file-report-table.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file-word',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/file-word.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'english',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/united-states.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'nepali',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/images/svg/nepali.svg')
    );
  }
}
