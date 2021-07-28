import { MvGridColumn } from "src/shared/controls/mat-grid/mat-grid.model";

export const gridColumns: MvGridColumn[] = [
  {
    Name: "Action",
    Type: "Action",
    Sticky: true
  },
  {
    Name: "ListItem",
    Type: "Text",
    Sticky: true,
  },
  {
    Name: "Description",
    Type: "Text",
  },
  {
    Name: "Category",
    Type: "Text",
  },
  {
    Name: "CategoryDescription",
    Type: "Text",
  },
  {
    Name: "IsSystem",
    Type: "Boolean",
  },
  {
    Name: "ModifiedDate",
    Type: "DateTime",
  },
  {
    Name: "ModifiedBy",
    Type: "Text",
  },
];
