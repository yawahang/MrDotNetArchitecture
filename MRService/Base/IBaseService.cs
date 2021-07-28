using MRModel.Account;
using MRModel.Base;
using System.Threading.Tasks;

namespace MRService.Base
{
    public interface IBaseService
    {

        /// <summary>
        /// Get Info
        /// </summary>
        /// <param name="Json">
        /// {}
        /// </param>
        /// <returns>GetInfo</returns>
        Task<MvResponse<dynamic>> GetInfo();

        #region ListItem
        /// <summary>
        /// Get ListItem
        /// </summary>
        /// <param name="Json">
        /// {"Category": "ProductStatus"}
        /// </param>
        /// <returns>List of MvListItem</returns>
        Task<MvResponse<MvListItem>> ListItem(string json);
        /// <summary>
        /// Get ListItemList
        /// </summary>
        /// <param name="Json">
        ///{ 
        //{
        //   "Option": {
        //       "Filter": {
        //         "Status": "Active"
        //       },
        //     "SearchText": "",
        //     "Offset": 0,
        //     "PageSize": 10,
        //     "SortBy": "ListItem",
        //     "SortOrder": "asc"
        //   }
        // }
        //}</param>
        /// <returns>List of MvListItemList</returns>
        Task<MvResponse<MvListItemList>> ListItemList(string json);
        /// <summary>
        /// Insert/Update ListItem
        /// </summary>
        /// <param name="Json">
        //{
        //   "ListItem": "Active",
        //   "Description": "Active",
        //   "ListItemCategoryId": 1,
        //   "ListItemId": 0
        // }
        // </param>
        /// <returns>List of MvListItemList</returns>
        Task<MvResponse<MvListItemList>> ListItemTsk(string json);
        /// <summary>
        /// Get ListItemCategoryList for ddl
        /// </summary>
        /// <param name="Json">
        /// { }
        //</param>
        /// <returns>List of MvListItemCategory</returns>
        Task<MvResponse<MvListItemCategory>> ListItemCategoryList(string json);
        /// <summary>
        /// Get ListItemCategory
        /// </summary>
        /// <param name="Json">
        ///                 {   "UserId":1,
        //                      "Option": {
        //	                        "SearchText": "",
        //	                        "Offset": 0,
        //	                        "PageSize": 10,
        //	                        "SortBy": "Category",
        //	                        "SortOrder": "asc"
        //                   }
        //}
        //</param>
        /// <returns>List of ListItemCategory</returns>
        Task<MvResponse<MvListItemCategory>> ListItemCategory(string json);
        /// <summary>
        /// Insert/Update ListItemCategory
        /// </summary>
        /// <param name="Json">
        ///                {
        //                      "Category": "",
        //						"Description": "",
        //						"ListItemCategoryId": 0 
        //                 }
        //}
        //</param>
        /// <returns>List of MvListItemCategory</returns>
        Task<MvResponse<MvListItemCategory>> ListItemCategoryTsk(string json);
        #endregion ListItem 
        /// <summary>
        /// Get Role
        /// </summary>
        /// <param name="Json">
        /// {
        //                      "Option": {
        //	                    "SearchText": "",
        //	                    "Offset": 0,
        //	                    "PageSize": 10,
        //	                    "SortBy": "Role",
        //	                    "SortOrder": "asc"
        //                      }
        //}
        //</param>
        /// <returns>List of MvRole</returns>
        Task<MvResponse<MvRole>> Role(string json);
        /// <summary>
        /// Get RoleNavigationAction
        /// </summary>
        /// <param name="Json">
        /// {
        ///                     "RoleId":1
        //}
        //</param>
        /// <returns>List of MvDataAccess</returns>
        Task<MvResponse<MvDataAccess>> RoleNavigationAction(string json);
        /// <summary>
        /// Insert/Update Role
        /// </summary>
        /// <param name="Json">
        /// {
        //                      "Option": {
        //	                    "SearchText": "",
        //	                    "Offset": 0,
        //	                    "PageSize": 10,
        //	                    "SortBy": "Role",
        //	                    "SortOrder": "asc"
        //                      }
        //}
        //</param>
        /// <returns>List of ListItemCategory</returns>
        Task<MvResponse<MvRole>> RoleTsk(string json);
        /// <summary>
        /// Get MvNavigationList
        /// </summary>
        /// <param name="Json">
        /// {
        //      "RoleIdList":[1,2,3],
        //      "Type": "Internal"
        //  }
        // </param>
        /// <returns>List of MvNavigationList</returns>
        Task<MvResponse<MvNavigationList>> NavigationList(string json);
        /// <summary>
        /// Get MvApplicationList
        /// </summary>
        /// <param name="Json">{ "RoleIdList":[1,2,3] }</param>
        /// <returns>List of MvApplicationList</returns>
        Task<MvResponse<MvApplicationList>> ApplicationList(string json);
        /// <summary>
        /// Insert/Update RoleNavigationAction
        /// </summary>
        /// <param name="Json">
        /// {
        //                      "NavigationActionIdList": [1,2,3]
        //                      }
        //</param>
        /// <returns>List of RoleNavigationAction</returns>
        Task<MvResponse<MvRoleNavigationAction>> RoleNavigationActionTsk(string json);
        /// <summary>
        /// Get Culture
        /// </summary>
        /// <param name="Json">{}</param>
        /// <returns>List of MvCulture</returns>
        Task<MvResponse<MvCulture>> Culture(string json);
    }
}
