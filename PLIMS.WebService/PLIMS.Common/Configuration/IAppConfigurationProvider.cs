using PLIMS.Common.Configuration.Model;

namespace PLIMS.Common.Configuration
{
    public interface IAppConfigurationProvider
    {
        public ConfigurationData Data { get; set; }
    }
}