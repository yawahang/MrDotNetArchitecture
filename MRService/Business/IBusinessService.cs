using MRModel.Base;
using MRModel.Business;
using System.Threading.Tasks;

namespace MRService.Business
{
    public interface IBusinessService
    {
        /// <summary>
        /// Get Company
        /// </summary>
        /// <param name="Json">
        //{
        //  "Filter": {
        //    "Status": "Active"
        //  },
        //  "TenantId": 0
        //}
        //</param>
        /// <returns>List of MvCompany</returns>
        Task<MvResponse<MvCompany>> Company(string json);
        /// <summary>
        /// Insert/Update Company
        /// </summary>
        /// <param name="Json">
        //{
        //  "CompanyId": 0,
        //  "TenantId": 0,
        //  "Company": "MrSolution",
        //  "Alias": "MR",
        //  "ParentCompanyId": null,
        //  "CompanyTypeListItemId": 1,
        //  "StatusListItemId": 2
        //}
        //}</param>
        /// <returns>List of MvCompany</returns>
        Task<MvResponse<MvCompany>> CompanyTsk(string json);
        /// <summary>
        /// Get Office
        /// </summary>
        /// <param name="Json">
        //{
        //  "Filter": {
        //    "Status": "Active"
        //  },
        //}
        //</param>
        /// <returns>List of MvOffice</returns>
        Task<MvResponse<MvOffice>> Office(string json);
        /// <summary>
        /// Insert/Update Office
        /// </summary>
        /// <param name="Json">
        //{
        //  "OfficeId": 0,
        //  "Office": "MrSolution", 
        //  "CompanyId": 0,
        //  "ParentOfficeId": 0,
        //  "StatusListItemId": 2
        //}
        //}</param>
        /// <returns>List of MvOffice</returns>
        Task<MvResponse<MvOffice>> OfficeTsk(string json);
    }
}
