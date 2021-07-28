import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppConst } from 'src/app/app.config';

@Component({
	selector: 'error-invalid-browser',
	templateUrl: './invalid-browser-component.html',
	styleUrls: ['./invalid-browser-component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ErrorInvalidBrowserComponent implements OnInit {

	constructor(private router: Router) {

	}

	ngOnInit() {

	}

	homeClick() {

		this.router.navigate([AppConst.Data?.DefaultNavigationUrl || '/login'], {});
	}
}