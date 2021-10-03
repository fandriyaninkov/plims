using Microsoft.Extensions.Configuration;
using PLIMS.Common.Configuration.Model;

namespace PLIMS.Common.Configuration
{
    public class AppConfigurationSource : FileConfigurationSource
    {
        public DataBaseSettings DataBaseSettings { get; set; }

        public AppConfigurationSource(string filePath)
        {
            Path = filePath;
            ReloadOnChange = true;
        }
        
        public override IConfigurationProvider Build(IConfigurationBuilder builder)
        {
            this.EnsureDefaults(builder);
            return new AppConfigurationProvider(this);
        }
    }
}