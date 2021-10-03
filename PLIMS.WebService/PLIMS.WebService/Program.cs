using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PLIMS.Business;
using PLIMS.Common.Configuration;
using Serilog;
using Serilog.Events;

namespace PLIMS.WebService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false)
                .Build();
            
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
#if DEBUG
                .WriteTo.Console()
#endif
                
                .WriteTo.File($"logs/log-.log", rollingInterval: RollingInterval.Day)
                .CreateLogger();

            var port = config.GetValue<int>("Port");
            CreateHostBuilder(args, port).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args, int port) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog()
#if Windows
                    .UseWindowsService()
#endif
                .ConfigureAppConfiguration((context, builder) =>
                {
                    builder.AddAppJson("appsettings.json");
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseUrls($"http://localhost:{port}")
                        .UseStartup<Startup>();
                });
    }
}