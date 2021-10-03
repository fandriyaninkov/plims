using System.IO;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using PLIMS.Common.Configuration.Model;

namespace PLIMS.Common.Configuration
{
    public class AppConfigurationProvider : FileConfigurationProvider, IAppConfigurationProvider
    {
        public ConfigurationData Data { get; set; }
        public AppConfigurationProvider(FileConfigurationSource source) : base(source)
        {
        }

        public override void Load(Stream stream)
        {
            if (stream.CanSeek)
            {
                stream.Seek(0, SeekOrigin.Begin);
                using (var streamReader = new StreamReader(stream))
                {
                    var fileContent = streamReader.ReadToEnd();
                    Data = JsonSerializer.Deserialize<ConfigurationData>(fileContent);
                }
            }
        }
    }
}