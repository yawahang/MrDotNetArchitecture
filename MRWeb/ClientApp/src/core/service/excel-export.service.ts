import { Injectable } from "@angular/core";
import { utils as XLSXUtils, writeFile } from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx/types';

@Injectable({
    providedIn: 'root'
})
export class ExcelExportService {

    fileExtension = '.xlsx';

    public exportAsExcel(option: MvExcelExportOption): void {

        let wb: WorkBook;

        if (option.Table) {

            wb = XLSXUtils.table_to_book(option.Table);
        } else {

            const ws: WorkSheet = XLSXUtils.json_to_sheet(option.Data, { header: option.Header });
            wb = XLSXUtils.book_new();
            XLSXUtils.book_append_sheet(wb, ws, option.SheetName);
        }

        writeFile(wb, `${option.FileName}${this.fileExtension}`);
    }
}

export interface MvExcelExportOption {
    Data: any[];
    FileName: string;
    SheetName?: string;
    Header?: string[];
    Table?: HTMLElement;
}