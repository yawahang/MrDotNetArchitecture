export interface MvTile {
    Title: string;
    Description: string;
    Type: string; // Box, Donut, Pie
    Orientation?: string; // for Column/Bar (Horizontal/Vertical)
    SubType?: string; // for Column/Bar (Single/Stacked)
    Value?: number; // for box
    Data?: any[]; // for Charts
    YAxisLabel?: string; // for Charts
    XAxisLabel?: string; // for Charts
    Background: string; // color
}