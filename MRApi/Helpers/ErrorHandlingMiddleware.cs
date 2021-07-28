using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;

namespace MRApi.Helpers
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                //CommonLog.log.Info($"Exception catched by : {nameof(ErrorHandlingMiddleware) } Ex: {ex}");
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            HttpStatusCode code;
            string exceptionMessage;
            if (!context.User.Identity.IsAuthenticated)
            {
                code = HttpStatusCode.Unauthorized;
                exceptionMessage = exception.Message;
            }
            else
            {
                code = HttpStatusCode.BadRequest;
                exceptionMessage = exception.Message;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            var result = JsonConvert.SerializeObject(new { error = exceptionMessage });
            //CommonLog.log.Info($"Return : { result } ");
            return context.Response.WriteAsync(result);
        }
    }
}
