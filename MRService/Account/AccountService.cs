using MRModel.Account;
using MRModel.Base;
using MRService.DataAccess;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace MRService.Account
{
    public class AccountService : IAccountService
    {
        private readonly IDataAccessService _ds;
        public AccountService(IDataAccessService ds)
        {
            _ds = ds;
        }

        public async Task<MvResponse<MvUser>> Login(string json)
        {
            try
            {
                MvLoginParam tempParam = JsonConvert.DeserializeObject<MvLoginParam>(json);
                string result = await _ds.RetrievalProc("dbo.SpUserSel", json, tempParam.OrgCode);
                return JsonConvert.DeserializeObject<MvResponse<MvUser>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserDefault>> UserDefaultUpd(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpUserDefaultUpd", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserDefault>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserSetting>> UserSetting(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpUserSettingUpd", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserSetting>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvNavigationAction>> NavigationAction(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpNavigationActionSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvNavigationAction>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserList>> PasswordResetTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpPasswordResetTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserList>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvPasswordInfo>> PasswordInfo(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpPasswordInfoSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvPasswordInfo>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserInfo>> UserInfo(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpUserInfoSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserInfo>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserRole>> UserRole(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpUserRoleSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserRole>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<dynamic>> ExistingUsername(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpExistingUsernameSel", json);
                return JsonConvert.DeserializeObject<MvResponse<dynamic>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserProfile>> UserProfile(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpUserProfileSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserProfile>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserProfile>> UserProfileUpd(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpUserProfileUpd", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserProfile>>(result);
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public async Task<MvResponse<MvUserProfile>> ProfileImageUpd(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpProfileImageUpd", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserProfile>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserList>> UserRoleTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpUserRoleTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserList>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserList>> User(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpUserListSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserList>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvUserList>> UserTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpUserTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUserList>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvDataAccess>> DataAccess(string json)
        {
            try
            {
                string result = await _ds.RetrievalProc("dbo.SpDataAccessSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvDataAccess>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<dynamic>> DataAccessTsk(string json)
        {
            try
            {
                string result = await _ds.ActionProc("dbo.SpDataAccessTsk", json);
                return JsonConvert.DeserializeObject<MvResponse<dynamic>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
