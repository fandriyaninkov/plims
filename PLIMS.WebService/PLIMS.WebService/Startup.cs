using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

#if RELEASE
using Microsoft.AspNetCore.HttpOverrides;
using System.Net;
#endif

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PLIMS.DI;
using PLIMS.WebService.Middlewares;

namespace PLIMS.WebService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var configRoot = Configuration as ConfigurationRoot;
            DependencyBootstrapper.InitializeDependency(services, configRoot);
            services.AddControllers();
            services.AddCors(options => options.AddPolicy("ApiCorsPolicy",
                builder => builder.WithOrigins("http://localhost:4200"
#if RELEASE
                    , "http://77.222.42.118"
#endif
                    ).AllowAnyMethod().AllowAnyHeader()));
#if RELEASE
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | 
                    ForwardedHeaders.XForwardedHost | 
                    ForwardedHeaders.XForwardedProto;
                
                options.ForwardLimit = 2;
                options.KnownProxies.Add(IPAddress.Parse("77.222.42.118"));
            });
#endif
            
#if DEBUG
            services.AddSwaggerDocument();
#endif
            services.AddSpaStaticFiles(cfg =>
            {
                cfg.RootPath = "wwwroot";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
#if RELEASE
            app.UseForwardedHeaders();
#endif
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

#if DEBUG
            app.UseOpenApi();
            app.UseSwaggerUi3();
#endif
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("ApiCorsPolicy");
            app.UsePlimsMiddleware();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "..\\..\\ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}