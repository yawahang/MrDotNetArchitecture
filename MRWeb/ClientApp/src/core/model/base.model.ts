import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface MvHttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    params?: HttpParams | {};
}

export interface MvNavigation {
    Navigation: string;
    NavigationId: number;
    Url: string;
    Icon: string;
    IsExternal: boolean;
    ParentNavigationId?: number;
    ApplicationId?: number;
    Application?: string;
    IsActive?: boolean;
}

export interface MvNavigationAction {
    NavigationId: number;
    Navigation: string;
    NavigationActionId: number;
    NavigationAction: string;
    IsSelect: boolean;
}

export interface MvNavigationActionList {
    NavigationActionId: number;
    NavigationAction: string;
    Icon: string;
    Color?: string;
    Class?: string;
    ShowInGrid?: boolean | false; // shown in grid row action
}

export interface MvRole {
    RoleId: number;
    Role: string;
    Status: string;
    StatusListItemId: number;
    IsSystem: boolean;
    ModifiedDate: string;
    ModifiedBy: string;
}

export interface MvUserRole {
    RoleId: number;
    Role: string;
    IsSelect?: boolean;
}

export interface MvRoleFilter {
    StatusIdList: number[];
}

export interface MvListItem {
    ListItemId: number;
    ListItem: string;
    Description: string;
}

export interface MvListItemList {
    ListItemId: number;
    ListItem: string;
    Description: string;
    Category: string;
    CategoryDescription: string;
    ListItemCategoryId: number;
    Status: string;
    IsSystem: boolean;
    ModifiedDate: string;
    ModifiedBy: string;
}

export interface MvListItemCategory {
    ListItemCategoryId: number;
    Category: string;
    Description: string;
    IsSystem: boolean;
    ModifiedDate: string;
    ModifiedBy: string;
}

export interface MvRoleList {
    RoleId: number;
    Role: string;
}

export interface MvApplication {
    ApplicationId: number;
    Application: string;
    Description?: string;
    Icon?: string;
    IsActive?: boolean;
}

export interface MvCulture {
    CultureId: number;
    Culture: string;
    Description: string;
    IsActive?: boolean;
}