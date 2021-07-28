import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpCacheService {

    private requests: any = {};

    constructor() {

    }

    get(url: string): HttpResponse<any> | undefined {
        return this.requests[url];
    }

    clearCache(): void {
        this.requests = {};
    }
}