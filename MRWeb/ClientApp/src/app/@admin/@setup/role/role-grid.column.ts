import { MvGridColumn } from "src/shared/controls/mat-grid/mat-grid.model";

export const gridColumns: MvGridColumn[] = [
    {
        "Name": "Action",
        "Sticky": true,
        "Type": "Action"
    },
    {
        "Name": "Role",
        "Sticky": true,
        "Type": "Text"
    },
    {
        "Name": "Status",
        "Type": "Text"
    },
    {
        "Name": "IsSystem",
        "Type": "Boolean"
    },
    {
        "Name": "ModifiedDate",
        "Type": "DateTime"
    },
    {
        "Name": "ModifiedBy",
        "Type": "Text"
    }
];