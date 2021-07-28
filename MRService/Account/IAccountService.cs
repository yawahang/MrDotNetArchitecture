using MRModel.Account;
using MRModel.Base;
using System.Threading.Tasks;

namespace MRService.Account
{
    public interface IAccountService
    {
        /// <summary>
        /// Get User
        /// </summary>
        /// <returns>User Detail</returns>
        Task<MvResponse<MvUser>> Login(string json);
        /// <summary>
        /// Get NavigationAction of CurrentRoleId and CurrentNavigation (Url)
        /// </summary>
        /// <param name="Json">{"Url": "/print"}</param>
        /// <returns>List of NavigationAction</returns>
        Task<MvResponse<MvNavigationAction>> NavigationAction(string json);
        /// <summary>
        /// Reset Password
        /// </summary>
        /// <param name="Json">{
        //                      "UserId":1,
        //                      "Password": "Yawa@123"
        //                      }
        //}</param>
        /// <returns>User</returns>
        Task<MvResponse<MvUserList>> PasswordResetTsk(string json);
        /// <summary>
        /// User Default Update
        /// </summary>
        /// <param name="Json">
        /// {
        ///      "DefaultApplicationId": 1,
        ///      "DefaultNavigationId": 1, 
        ///      "CurrentRoleId": 1
        /// }
        //}</param>
        /// <returns>MvUserDefault</returns>
        Task<MvResponse<MvUserDefault>> UserDefaultUpd(string json);
        /// <summary>
        /// User Setting
        /// </summary> 
        /// <param name="Json">
        /// {
        ///      "CultureId": 1, 
        ///      "IsNavigationPin": 1,
        ///      "IsDarkTheme": 1
        /// }
        /// <returns>MvUserSetting</returns>
        Task<MvResponse<MvUserSetting>> UserSetting(string json);
        /// <summary>
        /// Get PasswordInfo
        /// </summary>
        /// <param name="Json">{"UserId": 1}</param>
        /// <returns>MvPasswordInfo</returns>
        Task<MvResponse<MvPasswordInfo>> PasswordInfo(string json);
        /// <summary>
        /// Get UserInfo
        /// </summary>
        /// <param name="Json">{"OrgCode":"mr"</param>
        /// <returns>UserInfo</returns>
        Task<MvResponse<MvUserInfo>> UserInfo(string json);
        /// <summary>
        /// Get UserRole
        /// </summary>
        /// <param name="Json">
        /// {
        ///                     "UserId":1,
        //                      "Option": {
        //	                    "SearchText": "",
        //	                    "Offset": 0,
        //	                    "PageSize": 10,
        //	                    "SortBy": "Role",
        //	                    "SortOrder": "asc"
        //                      }
        //}
        //</param>
        /// <returns>List of MvUserRole</returns>
        Task<MvResponse<MvUserRole>> UserRole(string json);
        /// <summary>
        /// Get Existing Username
        /// </summary>
        /// <param name="Json">
        /// {"Username": "abc@mnr.com"}
        /// </param>
        /// <returns>List of MvUserList</returns>
        Task<MvResponse<dynamic>> ExistingUsername(string json);
        /// <summary>
        /// Get UserProfile
        /// </summary>
        /// <param name="Json">
        /// {  }
        /// </param>
        /// <returns>List of MvUserProfile</returns>
        Task<MvResponse<MvUserProfile>> UserProfile(string json);
        /// <summary>
        /// Update UserProfileUpd
        /// </summary>
        /// <param name="Json"> 
        /// { "Username":"admin@mr.com",
        ///							  "FirstName":"MR",
        ///							"MiddleName":"",
        ///							"LastName":"Admin"
        ///							   }
        //</param>
        /// <returns>List of MvUserProfile</returns>
        Task<MvResponse<MvUserProfile>> UserProfileUpd(string json);
        /// <summary>
        /// Update ProfileImage Upd
        /// </summary>
        /// <param name="Json"> 
        /// { "ProfileImage ":"" }
        //</param>
        /// <returns>List of MvUserProfile</returns>
        Task<MvResponse<MvUserProfile>> ProfileImageUpd(string json);
        /// <summary>
        /// Insert/Update UserRole
        /// </summary>
        /// <param name="Json">
        /// [{ 
        //   "UserId": 0,
        //   "RoleId": 0
        //  }]
        //</param>
        /// <returns>List of MvUserList</returns>
        Task<MvResponse<MvUserList>> UserRoleTsk(string json);
        /// <summary>
        /// Get User
        /// </summary>
        /// <param name="Json">
        /// {
        //                      "Option": {
        //	                    "SearchText": "",
        //	                    "Offset": 0,
        //	                    "PageSize": 10,
        //	                    "SortBy": "Username",
        //	                    "SortOrder": "asc"
        //                      }
        //}
        //</param>
        /// <returns>List of MvUserList</returns>
        Task<MvResponse<MvUserList>> User(string json);
        /// <summary>
        /// Insert/Update User
        /// </summary>
        /// <param name="Json">
        /// {
        //                      "Option": {
        //	                    "SearchText": "",
        //	                    "Offset": 0,
        //	                    "PageSize": 10,
        //	                    "SortBy": "Username",
        //	                    "SortOrder": "asc"
        //                      }
        //}
        //</param>
        /// <returns>List of MvUserList</returns>
        Task<MvResponse<MvUserList>> UserTsk(string json);
        /// <summary>
        /// Get User
        /// </summary>
        /// <param name="Json">
        /// { }
        //</param>
        /// <returns>List of MvDataAccess</returns>
        Task<MvResponse<MvDataAccess>> DataAccess(string json);
        /// <summary>
        /// Update DataAccess
        /// </summary>
        /// <param name="Json">
        //{
        //   "DefaultOfficeId": 1,
        //   "UserId": 1,
        //   "Access": [
        //     {
        //       "OfficeId": 1,
        //       "IsSelect": 1
        //     }
        //   ]
        // }
        //</param>
        /// <returns></returns>
        Task<MvResponse<dynamic>> DataAccessTsk(string json);
    }
}
