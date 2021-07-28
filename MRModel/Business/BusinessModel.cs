
using System;

namespace MRModel.Business
{
    public class MvCompany
    {
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public string Alias { get; set; }
        public int? ParentCompanyId { get; set; }
        public string? ParentCompany { get; set; }
        public int TenantId { get; set; }
        public string Tenant { get; set; }
        public int CompanyTypeListItemId { get; set; }
        public string CompanyType { get; set; }
        public int StatusListItemId { get; set; }
        public string Status { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }

    public class MvOffice
    {
        public int OfficeId { get; set; }
        public string Office { get; set; }
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public int? ParentOfficeId { get; set; }
        public int StatusListItemId { get; set; }
        public string Status { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
