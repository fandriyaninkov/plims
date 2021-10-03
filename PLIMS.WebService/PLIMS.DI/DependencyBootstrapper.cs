using System.Linq;
using AutoMapper;
using LinqToDB.AspNet;
using LinqToDB.AspNet.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PLIMS.Business;
using PLIMS.Business.Mapper;
using PLIMS.Business.Services;
using PLIMS.Business.Services.Interfaces;
using PLIMS.Common.Configuration;
using PLIMS.DataAccess.Providers;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.DataAccess.Settings;

namespace PLIMS.DI
{
    public class DependencyBootstrapper
    {
        public static void InitializeDependency(IServiceCollection services, ConfigurationRoot configurationRoot)
        {
            services.AddAutoMapper(typeof(EntityToVMProfile), typeof(VMToEntityProfile));
            
            if (configurationRoot.Providers.FirstOrDefault(x => x is AppConfigurationProvider) is AppConfigurationProvider appProvider)
            {
                services.AddTransient<IAppConfigurationProvider, AppConfigurationProvider>(x => appProvider);
                services.AddLinqToDbContext<AppDataConnection>((provider, options) =>
                {
                    options
                        .UsePostgreSQL(appProvider.Data.DataBase.ConnectionString)
                        .UseDefaultLogging(provider);
                });
            }

            // services
            services.AddScoped<IChemicalAnalysisService, ChemicalAnalysisService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ISamplingPlaceService, SamplingPlaceService>();
            services.AddScoped<ISamplingPointService, SamplingPointService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IGasCondensateContentWmrService, GasCondensateContentWmrService>();
            
            // providers
            services.AddScoped<IPlacesProvider, PlaceProvider>();
            services.AddScoped<IPointsProvider, PointsProvider>();
            services.AddScoped<IUsersProvider, UsersProvider>();
            services.AddScoped<IChemicalAnalysisProvider, ChemicalAnalysisProvider>();
            services.AddScoped<IGasCondensateContentWmrProvider, GasCondensateContentWmrProvider>();
        }
        
    }
}