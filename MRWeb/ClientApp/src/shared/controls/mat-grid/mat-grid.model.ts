export interface MvGridConfig<T = void> {
    Columns: MvGridColumn[];
    Data: {
        Data: any[],
        TotalRows: number;
    };
    Loading: boolean;
    RowTooltip?: string;
    RowActionOption?: MvGridRowActionOption;
    FileName: string; // excel export file name
    SheetName?: string;  // excel export sheet name
    Option: {
        SearchText?: string;
        Filter?: T;
        Offset?: number;
        PageSize?: number;
        SortBy?: string;
        SortOrder?: string;
    }
}

export interface MvGridPaging {
    Offset?: number;
    PageSize?: number;
    SortBy?: string;
    SortOrder?: string;
}

export interface MvGridRowActionOption {
    NavigationId: number;
    DblClickNavigationAction: string;
}

export interface MvGridColumn {
    Name: string; // column name
    Type: string; // Action (For grid inline row actions), Text, Number, Percent, Money, Date, DateTime, CheckBox, Template
    TemplateColumns?: string[]; // TemplateColumn is the list of columns which is to be shown as template in current column
    /*
        Formats are added by default, use this property if custom format needed
        Defaults: AppConst.Data.GridOptions.GridColumnOption.Format
    */
    Format?: string;
    CellColor?: string; // change the color of cell text
    CellInfoText?: string; // pass information sentence if needed to show info icon with information in tooltip on hover
    Sticky?: boolean; // sticky header - false by default (row Actions should always be sticky)
    DisableSort?: boolean; // disable column sort - false by default
    /*
        Cell prefix like $ or Rs 
        Defaults: AppConst.Data.GridOptions.GridColumnOption.Prefix
   */
    Prefix?: string;
    /*
        Cell suffix like % 
        Defaults: AppConst.Data.GridOptions.GridColumnOption.Suffix
   */
    Suffix?: string;
    Hidden?: boolean; // hidden columns
    Width?: number; // cvolumn width
}
