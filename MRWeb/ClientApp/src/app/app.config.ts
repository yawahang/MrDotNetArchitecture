import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { environment as environmentprod } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AppConst {

    static Data: any;

    constructor() {

    }

    async load(): Promise<any> {

        const filePath = `/assets/${environment.production ? environmentprod.config : environment.config}?t=${new Date().getTime()}`;
        const response = await fetch(filePath);

        if (response.ok) {

            try {

                AppConst.Data = await response.json();

            } catch (error) {

                console.error('============================ ERROR ============================');
                console.error(`Could not find file ${filePath}.\nMESSAGE: ${error.message}`);
                console.error('============================ ERROR ============================');
            }

            if (AppConst.Data && !Object.keys((AppConst.Data)).length) {

                console.error('============================ ERROR ============================');
                console.error(`No data found in file ${filePath}`);
                console.error('============================ ERROR ============================');
            }
        } else {

            console.error('============================ ERROR ============================');
            console.error(`Failed to load file ${filePath}.\nMESSAGE: Request failed with ${response.status} / ${response.statusText}`);
            console.error('============================ ERROR ============================');
        }
    }
}