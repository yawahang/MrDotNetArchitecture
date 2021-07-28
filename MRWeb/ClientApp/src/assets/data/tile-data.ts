import { MvTile } from './../../shared/components/mat-tile/mat-tile.model';

// sample data
// Column
// Bar
// Line
export const columnBarLineChartSingleDs = [
    {
        "name": "Germany",
        "value": 8940000
    },
    {
        "name": "USA",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
    }
];

export const columnBarLineChartStackDs = [
    {
        "name": "Germany",
        "series": [
            {
                "name": "2010",
                "value": 7300000
            },
            {
                "name": "2011",
                "value": 8940000
            }
        ]
    },
    {
        "name": "USA",
        "series": [
            {
                "name": "2010",
                "value": 7870000
            },
            {
                "name": "2011",
                "value": 8270000
            }
        ]
    },
    {
        "name": "France",
        "series": [
            {
                "name": "2010",
                "value": 5000002
            },
            {
                "name": "2011",
                "value": 5800000
            }
        ]
    }
];

// Donut
// Pie
export const donutPieChartDs = [
    {
        "name": "Germany",
        "value": 8940000
    },
    {
        "name": "USA",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
    },
    {
        "name": "UK",
        "value": 6200000
    }
];

// Tile Data
export const boxTilesStock: MvTile[] = [
    {
        "Title": "Day",
        "Description": "Daily Stock",
        "Value": 12,
        "Type": "Box",
        "Background": "linear-gradient(to right, #3ec173, #addec8)"
    }, {
        "Title": "Week",
        "Description": "Weekly Stock",
        "Value": 50,
        "Type": "Box",
        "Background": "linear-gradient(to right, #e69633, #e6c7a0)"
    },
    {
        "Title": "Month",
        "Description": "Monthly Stock",
        "Value": 200,
        "Type": "Box",
        "Background": "linear-gradient(to right, #e64433, #e6938a)"
    },
    {
        "Title": "Yearly",
        "Description": "Yearly Stock",
        "Value": 1356,
        "Type": "Box",
        "Background": "linear-gradient(to right, #148cc5, #97c9e1)"
    }];

export const boxTilesSales: MvTile[] = [
    {
        "Title": "Day",
        "Description": "Daily Sales",
        "Value": 12,
        "Type": "Box",
        "Background": "linear-gradient(to right, #3ec173, #addec8)"
    }, {
        "Title": "Week",
        "Description": "Weekly Sales",
        "Value": 50,
        "Type": "Box",
        "Background": "linear-gradient(to right, #e69633, #e6c7a0)"
    },
    {
        "Title": "Month",
        "Description": "Monthly Sales",
        "Value": 200,
        "Type": "Box",
        "Background": "linear-gradient(to right, #e64433, #e6938a)"
    },
    {
        "Title": "Yearly",
        "Description": "Yearly Sales",
        "Value": 1356,
        "Type": "Box",
        "Background": "linear-gradient(to right, #148cc5, #97c9e1)"
    }];

export const donutPieChart: MvTile[] = [
    {
        "Title": "Donut Chart",
        "Description": "This Is Donut Chart",
        "Type": "Donut",
        "Background": "#fff",
        "Data": donutPieChartDs
    },
    {
        "Title": "Pie Chart",
        "Description": "This Is Pie Chart",
        "Type": "Pie",
        "Background": "#fff",
        "Data": donutPieChartDs
    }
];

export const columnChart: MvTile[] = [{
    "Title": "Column Chart",
    "Description": "This Is Column Chart",
    "Type": "Column",
    "SubType": "Single",
    "Orientation": "Horizontal",
    "Background": "#fff",
    "Data": columnBarLineChartSingleDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
},
{
    "Title": "Column Chart Stacked",
    "Description": "This Is Stacked Column Chart",
    "Type": "Column",
    "SubType": "Stacked",
    "Orientation": "Horizontal",
    "Background": "#fff",
    "Data": columnBarLineChartStackDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
}];

export const columnChartV: MvTile[] = [{
    "Title": "Column Chart",
    "Description": "This Is Column Chart",
    "Type": "Column",
    "SubType": "Single",
    "Orientation": "Vertical",
    "Background": "#fff",
    "Data": columnBarLineChartSingleDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
},
{
    "Title": "Column Chart Stacked",
    "Description": "This Is Stacked Column Chart",
    "Type": "Column",
    "SubType": "Stacked",
    "Orientation": "Vertical",
    "Background": "#fff",
    "Data": columnBarLineChartStackDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
}];

export const barChart: MvTile[] = [{
    "Title": "Bar Chart",
    "Description": "This Is Bar Chart",
    "Type": "Bar",
    "SubType": "Single",
    "Orientation": "Horizontal",
    "Background": "#fff",
    "Data": columnBarLineChartSingleDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
},
{
    "Title": "Bar Chart Stacked",
    "Description": "This Is Stacked Bar Chart",
    "Type": "Bar",
    "SubType": "Stacked",
    "Orientation": "Horizontal",
    "Background": "#fff",
    "Data": columnBarLineChartStackDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
}];

export const barChartV: MvTile[] = [{
    "Title": "Bar Chart",
    "Description": "This Is Bar Chart",
    "Type": "Bar",
    "SubType": "Single",
    "Orientation": "Vertical",
    "Background": "#fff",
    "Data": columnBarLineChartSingleDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
},
{
    "Title": "Bar Chart Stacked",
    "Description": "This Is Stacked Bar Chart",
    "Type": "Bar",
    "SubType": "Stacked",
    "Orientation": "Vertical",
    "Background": "#fff",
    "Data": columnBarLineChartStackDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
}];

export const lineChart: MvTile[] = [{
    "Title": "Line Chart",
    "Description": "This Is Line Chart",
    "Type": "Line",
    "SubType": "Single",
    "Background": "#fff",
    "Data": columnBarLineChartStackDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
},
{
    "Title": "Line Chart Stacked",
    "Description": "This Is Stacked Line Chart",
    "Type": "Line",
    "SubType": "Stacked",
    "Background": "#fff",
    "Data": columnBarLineChartStackDs,
    "XAxisLabel": "Country",
    "YAxisLabel": "Normalized Population"
}];