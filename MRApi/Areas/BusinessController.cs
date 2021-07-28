using Microsoft.AspNetCore.Mvc;
using MRModel.Base;
using MRService.Business;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace MRApi.Areas
{
    public class BusinessController : AuthController
    {
        private readonly IBusinessService _bsrv;
        public BusinessController(IBusinessService bsrv)
        {
            _bsrv = bsrv;
        }

        [HttpGet]
        public async Task<IActionResult> Company(string json)
        {
            try
            {
                var response = await _bsrv.Company(json);
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
        public async Task<IActionResult> CompanyTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _bsrv.CompanyTsk(json.Json.ToString());
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
        public async Task<IActionResult> Office(string json)
        {
            try
            {
                var response = await _bsrv.Office(json);
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
        public async Task<IActionResult> OfficeTsk([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _bsrv.OfficeTsk(json.Json.ToString());
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
