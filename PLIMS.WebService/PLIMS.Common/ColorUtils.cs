using System;
using System.Linq;

namespace PLIMS.Common
{
    public class ColorUtils
    {
        private static string[] Colors = new[]
        {
            "#076c9d", "#5db7dc", "#963ea1", "#820ac3", "#59db6d", "#b29d99", "#f31ee1", "#eecbe1", "#a2f16f",
            "#893e3d", "#66afd0", "#c5cf89", "#f4f4a0", "#e26d4a", "#838ed5", "#2a7055", "#f0706d", "#8f4313",
            "#fbb369", "#45f2a5", "#510d58", "#c18b7c"
        };

        private static readonly Random _random = new Random();
        
        public static string ColorGenerator(string[] excludeColors)
        {
            var nextColor = true;
            string color = string.Empty;
            while (nextColor)
            {
                var index = _random.Next(0, 21);
                color = Colors[index];
                nextColor = excludeColors.Any(x => x.Equals(color));
            }

            return color;
        }
    }
}