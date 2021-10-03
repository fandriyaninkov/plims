using System;
using Microsoft.Extensions.Configuration;

namespace PLIMS.Common.Configuration
{
    public static class AppConfigurationExtensions
    {
        public static IConfigurationBuilder AddAppJson(this IConfigurationBuilder builder, string filePath)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            if (string.IsNullOrEmpty(filePath))
            {
                throw new ArgumentNullException(nameof(filePath));
            }

            return builder.Add(new AppConfigurationSource(filePath));
        }
    }
}