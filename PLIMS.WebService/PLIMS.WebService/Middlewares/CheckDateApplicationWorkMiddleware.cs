using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace PLIMS.WebService.Middlewares
{
    public class CheckDateApplicationWorkMiddleware
    {
        private readonly RequestDelegate _next;

        public CheckDateApplicationWorkMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var endDate = new DateTime(2021, 7, 1);
            var currentDate = DateTime.Now;
            if (endDate < currentDate)
            {
                context.Response.StatusCode = 403;
                context.Response.ContentType = "text/plain";
                await context.Response.WriteAsync("Доступ к приложению приостановлен", Encoding.UTF8);
            }
            else
            {
                await _next.Invoke(context);
            }
        }
    }
}