
export interface MvTree {
    readonly NodeId: number;
    readonly EnityId: number;
    readonly EnityType: string;
    readonly Node: string;
    readonly ParentNodeId: number;
    Checked: boolean;
    Visible: boolean | true; // optional, send false if a Node needs to be hidden
    Disabled: boolean | false; // optional, send true if a Node needs to be hidden
    // below properties need not to be send as data
    Searched: boolean | true;
    Expanded: boolean | true;
    Indeterminate: boolean | false;
}

export interface MvCheckedNode {
    NodeId: number;
    Node: string;
    Checked: boolean;
    EnityId: number;
    EnityType: string;
    ParentNodeId: number;
}

export interface MvTreeConfig {
    Data: MvTree[];
    Expanded: boolean | true;
    Searchable: boolean | true;
    ReturnValueOnInit: boolean | true;
}
