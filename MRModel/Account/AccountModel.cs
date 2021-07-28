using System;
using System.Collections.Generic;

namespace MRModel.Account
{
    public class MvLoginParam
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string OrgCode { get; set; }
    }

    public class MvUserProfile
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string ProfileImage { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Address { get; set; }
    }

    public class MvUser
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string OrgCode { get; set; }
        public string OrgName { get; set; }
    }

    public class MvPasswordInfo
    {
        public int UserId { get; set; }
        public string Password { get; set; }
    }

    public class MvUserInfo
    {
        public int DefaultOfficeId { get; set; }
        public string Name { get; set; }
        public string ProfileImage { get; set; }
        public string OrgImage { get; set; }
        public bool IsDarkTheme { get; set; }
        public bool IsNavigationPin { get; set; }
        public int CurrentRoleId { get; set; }
        public List<MvRoleList> Role { get; set; }
        public string Culture { get; set; }
        public List<MvCulture> CultureList { get; set; }
        public int? DefaultApplicationId { get; set; }
        public List<MvApplication> Application { get; set; }
        public int? DefaultNavigationId { get; set; }
        public string DefaultNavigationUrl { get; set; }
        public List<MvNavigation> Navigation { get; set; }
        public bool GridRowActionExpanded { get; set; }
    }

    public class MvUserDefault
    {
        public int? DefaultApplicationId { get; set; }
        public int? DefaultNavigationId { get; set; }
        public int? CurrentRoleId { get; set; }
        public List<MvNavigation> Navigation { get; set; }
        public List<MvRoleList> Role { get; set; }
    }

    public class MvUserSetting
    {
        public int CultureId { get; set; }
        public bool IsDarkTheme { get; set; }
        public bool IsNavigationPin { get; set; }
    }

    public class MvApplication
    {
        public int ApplicationId { get; set; }
        public string Application { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
    }

    public class MvApplicationList
    {
        public int ApplicationId { get; set; }
        public string Application { get; set; }
        public string Description { get; set; }
    }

    public class MvCulture
    {
        public int CultureId { get; set; }
        public string Culture { get; set; }
        public string Description { get; set; }
    }

    public class MvNavigation
    {
        public int NavigationId { get; set; }
        public string Navigation { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public int? ParentNavigationId { get; set; }
        public bool IsExternal { get; set; }
    }

    public class MvNavigationList
    {
        public int NavigationId { get; set; }
        public string Navigation { get; set; }
        public int? ApplicationId { get; set; }
        public string? Application { get; set; }
    }

    public class MvRoleNavigationAction
    {
        public int NavigationId { get; set; }
        public int NavigationActionId { get; set; }
        public string NavigationAction { get; set; }
        public string Navigation { get; set; }
        public bool IsSelect { get; set; }
    }

    public class MvNavigationAction
    {
        public int NavigationActionId { get; set; }
        public string NavigationAction { get; set; }
        public string Icon { get; set; }
        public bool? ShowInGrid { get; set; }
    }

    public class MvLoginResult
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }

    public class MvRoleList
    {
        public int RoleId { get; set; }
        public string Role { get; set; }
    }

    public class MvRole
    {
        public int RoleId { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public int StatusListItemId { get; set; }
        public bool IsSystem { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }

    public class MvUserRole
    {
        public int RoleId { get; set; }
        public string Role { get; set; }
        public bool IsSelect { get; set; }
    }

    public class MvUserList
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int StatusListItemId { get; set; }
        public string Status { get; set; }
        public int OfficeId { get; set; }
        public string Office { get; set; }
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int? CurrentRoleId { get; set; }
        public string? CurrentRole { get; set; }
        public int? DefaultNavigationId { get; set; }
        public string? DefaultNavigation { get; set; }
        public int? DefaultApplicationId { get; set; }
        public string? DefaultApplication { get; set; }
        public int CultureId { get; set; }
        public string Culture { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }

    public class MvDataAccess
    {
        public int NodeId { get; set; }
        public string Node { get; set; }
        public int? ParentNodeId { get; set; }
        public int EnityId { get; set; } // CompanyId, OfficeId
        public string EnityType { get; set; } // Company, Office
        public bool Checked { get; set; }
        public bool Disabled { get; set; }
        public bool Visible { get; set; }
    }
}
