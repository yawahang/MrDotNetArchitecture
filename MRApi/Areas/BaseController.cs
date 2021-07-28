
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MRModel.Base;
using MRService.Base;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace MRApi.Areas
{
    public class BaseController : AuthController
    {
        private readonly IBaseService _bs;
        public BaseController(IBaseService bs)
        {
            _bs = bs;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Info()
        {
            try
            {
                var response = await _bs.GetInfo();
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Response.Data);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #region ListItem
        [HttpGet]
        public async Task<IActionResult> ListItem(string json)
        {
            try
            {
                var response = await _bs.ListItem(json);
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
        public async Task<IActionResult> ListItemList(string json)
        {
            try
            {
                var response = await _bs.ListItemList(json);
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
        public async Task<IActionResult> ListItemTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _bs.ListItemTsk(json.Json.ToString());
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
        public async Task<IActionResult> ListItemCategory(string json)
        {
            try
            {
                var response = await _bs.ListItemCategory(json);
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
        public async Task<IActionResult> ListItemCategoryList(string json)
        {
            try
            {
                var response = await _bs.ListItemCategoryList(json);
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
        public async Task<IActionResult> ListItemCategoryTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _bs.ListItemCategoryTsk(json.Json.ToString());
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
        #endregion ListItem 

        [HttpPost]
        public async Task<IActionResult> RoleTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _bs.RoleTsk(json.Json.ToString());
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
        public async Task<IActionResult> Role(string json)
        {
            try
            {
                var response = await _bs.Role(json);
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
        public async Task<IActionResult> RoleNavigationAction(string json)
        {
            try
            {
                var response = await _bs.RoleNavigationAction(json);
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
        public async Task<IActionResult> NavigationList(string json)
        {
            try
            {
                var response = await _bs.NavigationList(json);
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
        public async Task<IActionResult> ApplicationList(string json)
        {
            try
            {
                var response = await _bs.ApplicationList(json);
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
        public async Task<IActionResult> RoleNavigationActionTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _bs.RoleNavigationActionTsk(json.Json.ToString());
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
        public async Task<IActionResult> Culture(string json)
        {
            try
            {
                var response = await _bs.Culture(json);
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
