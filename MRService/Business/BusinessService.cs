using MRModel.Base;
using MRModel.Business;
using MRService.DataAccess;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace MRService.Business
{
    public class BusinessService : IBusinessService
    {
        private readonly IDataAccessService _ds;
        public BusinessService(IDataAccessService ds)
        {
            _ds = ds;
        }

        public async Task<MvResponse<MvCompany>> Company(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpCompanySel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvCompany>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvCompany>> CompanyTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpCompanyTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvCompany>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvOffice>> Office(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpOfficeSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvOffice>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvOffice>> OfficeTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpOfficeTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvOffice>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
