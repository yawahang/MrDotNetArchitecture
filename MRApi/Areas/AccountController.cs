using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MRModel.Account;
using MRModel.Auth;
using MRModel.Base;
using MRService.Account;
using MRService.Auth;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MRApi.Areas
{
    public class AccountController : AuthController
    {
        private readonly IAccountService _asr;
        private readonly IAuthService _auth;
        public AccountController(IAccountService asr, IAuthService auth)
        {
            _asr = asr;
            _auth = auth;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.Login(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    var data = response.Response.Data.FirstOrDefault();
                    var claims = new[] {
                                           new Claim("UserId", data.UserId.ToString()),
                                           new Claim("Username", data.Username),
                                           new Claim("OrgCode", data.OrgCode),
                                           new Claim("OrgName", data.OrgName)
                                        };

                    var token = _auth.GenerateToken(data.Username, claims);
                    return Ok(new MvLoginResult
                    {
                        AccessToken = token.Result.AccessToken,
                        RefreshToken = token.Result.RefreshToken.TokenString
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    var username = User.Claims.Where(c => c.Type == "Username").FirstOrDefault().Value;
                    _auth.RemoveRefreshTokenByUsername(username);
                }

                return await Task.FromResult(Ok(new { }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> RefreshToken([FromBody] MvRefreshTokenRequest request)
        {
            try
            {
                var username = User.Identity.Name;

                if (string.IsNullOrWhiteSpace(request.RefreshToken))
                {
                    return Unauthorized("Unauthorized");
                }

                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
                var jwtResult = _auth.Refresh(request.RefreshToken, accessToken);
                return Ok(new MvLoginResult
                {
                    AccessToken = jwtResult.Result.AccessToken,
                    RefreshToken = jwtResult.Result.RefreshToken.TokenString
                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> UserInfo(string json)
        {
            try
            {
                var response = await _asr.UserInfo(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UserDefaultUpd([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.UserDefaultUpd(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UserSettingTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.UserSetting(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> NavigationAction(string json)
        {
            try
            {
                var response = await _asr.NavigationAction(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PasswordResetTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.PasswordResetTsk(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> PasswordInfo(string json)
        {
            try
            {
                var response = await _asr.PasswordInfo(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> UserRole(string json)
        {
            try
            {
                var response = await _asr.UserRole(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UserTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.UserTsk(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UserRoleTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.UserRoleTsk(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> UserList(string json)
        {
            try
            {
                var response = await _asr.User(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> ExistingUsername(string json)
        {
            try
            {
                var response = await _asr.ExistingUsername(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> UserProfile(string json)
        {
            try
            {
                var response = await _asr.UserProfile(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UserProfileUpd([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.UserProfileUpd(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ProfileImageUpd([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.ProfileImageUpd(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> DataAccess(string json)
        {
            try
            {
                var response = await _asr.DataAccess(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> DataAccessTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.DataAccessTsk(json.Json.ToString());
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
