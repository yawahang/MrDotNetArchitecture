
using MRModel.Account;
using MRModel.Base;
using MRService.DataAccess;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace MRService.Base
{
    public class BaseService : IBaseService
    {
        private readonly IDataAccessService _ds;
        public BaseService(IDataAccessService ds)
        {
            _ds = ds;
        }

        public async Task<MvResponse<dynamic>> GetInfo()
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpInfoSel", "{}");
                return JsonConvert.DeserializeObject<MvResponse<dynamic>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region ListItem
        public async Task<MvResponse<MvListItem>> ListItem(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpListItemSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvListItem>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvListItemList>> ListItemList(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpListItemListSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvListItemList>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvListItemList>> ListItemTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpListItemTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvListItemList>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvListItemCategory>> ListItemCategory(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpListItemCategorySel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvListItemCategory>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvListItemCategory>> ListItemCategoryTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpListItemCategoryTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvListItemCategory>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvListItemCategory>> ListItemCategoryList(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpListItemCategoryListSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvListItemCategory>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion ListItem 

        public async Task<MvResponse<MvRole>> Role(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpRoleSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvRole>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvDataAccess>> RoleNavigationAction(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpRoleNavigationActionSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvDataAccess>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvRole>> RoleTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpRoleTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvRole>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvNavigationList>> NavigationList(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpNavigationListSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvNavigationList>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvApplicationList>> ApplicationList(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpApplicationListSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvApplicationList>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvRoleNavigationAction>> RoleNavigationActionTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpRoleNavigationActionTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvRoleNavigationAction>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvCulture>> Culture(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpCultureSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvCulture>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
