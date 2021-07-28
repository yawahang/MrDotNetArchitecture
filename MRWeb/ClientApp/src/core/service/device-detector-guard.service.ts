import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
})
export class DeviceDetectorGuardService implements CanActivate, OnDestroy {

    private _unsubscribeAll: Subject<any>;

    constructor(
        private router: Router,
        private deviceDetector: DeviceDetectorService
    ) {
        this._unsubscribeAll = new Subject();
    }

    canActivate() {

        const deviceInfo = this.deviceDetector.getDeviceInfo();

        if ((deviceInfo && deviceInfo.browser) &&
            (deviceInfo.browser.toLowerCase().includes('chrome') ||
                deviceInfo.browser.toLowerCase().includes('firefox') ||
                deviceInfo.browser.toLowerCase().includes('edge') ||
                deviceInfo.browser.toLowerCase().includes('safari') ||
                deviceInfo.browser.toLowerCase().includes('opera'))) {

            let sessionHeaderParams: any = sessionStorage.getItem('HeaderParams');
            sessionHeaderParams = JSON.parse(sessionHeaderParams || '{}');
            sessionHeaderParams['os'] = deviceInfo?.os;
            sessionHeaderParams['browser'] = deviceInfo?.browser;
            sessionHeaderParams['browser_version'] = deviceInfo?.browser_version;
            sessionStorage.setItem('DeviceInfo', JSON.stringify(deviceInfo));
            sessionStorage.setItem('HeaderParams', JSON.stringify(sessionHeaderParams));
            return true;
        } else {

            this.router.navigateByUrl('error/invalid-browser');
        }
    }

    ngOnDestroy() {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

