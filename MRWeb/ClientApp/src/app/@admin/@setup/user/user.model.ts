import { MvApplication, MvCulture, MvNavigation, MvRoleList } from "src/core/model/base.model";

export interface MvUser {
    UserId: number;
    Username: string;
    Password: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    DefaultApplicationId?: number;
    DefaultApplication?: string;
    DefaultNavigationId?: number;
    DefaultNavigation?: string;
    CurrentRoleId?: number;
    CurrentRole?: string;
    CompanyId?: number;
    Company?: string;
    CultureId?: number;
    Culture?: string;
    OfficeId?: number;
    Office?: string;
    Status: string;
    StatusListItemId: number;
    IsSystem: boolean;
    ModifiedDate: string;
    ModifiedBy: string;
}

export interface MvUserInfo {
    DefaultOfficeId: number;
    Name: string;
    ProfileImage: string;
    OrgImage: string;
    IsDarkTheme: boolean;
    IsNavigationPin: boolean;
    DefaultApplicationId: number;
    Application: MvApplication[];
    CurrentRoleId: number;
    Role: MvRoleList[];
    Culture: string;
    CultureList: MvCulture[];
    DefaultNavigationId: number;
    DefaultNavigationUrl: string;
    Navigation: MvNavigation[];
    GridRowActionExpanded: boolean;
}

export interface MvUserFilter {
    StatusIdList: number[];
}

export interface MvNotification {
    NotificationId: number;
    Notification: string;
    Description: string;
    NotificationDate: string;
    Author: string;
}
