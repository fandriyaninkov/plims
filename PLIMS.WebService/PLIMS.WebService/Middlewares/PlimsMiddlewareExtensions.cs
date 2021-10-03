using Microsoft.AspNetCore.Builder;

namespace PLIMS.WebService.Middlewares
{
    public static class PlimsMiddlewareExtensions
    {
        public static IApplicationBuilder UsePlimsMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<CheckDateApplicationWorkMiddleware>();
        }
    }
}