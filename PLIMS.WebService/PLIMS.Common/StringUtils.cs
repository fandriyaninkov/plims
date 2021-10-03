using System.Text;

namespace PLIMS.Common
{
    public class StringUtils
    {
        public static string GetFullName(string firstName, string lastName, string patronymic)
        {
            var fullName = new StringBuilder();
            fullName.Append(lastName);
            if (!string.IsNullOrEmpty(firstName))
            {
                var symbol = firstName.TrimStart().Substring(0, 1).ToUpperInvariant();
                fullName.Append(" ").Append(symbol).Append(".");
            }

            if (!string.IsNullOrEmpty(patronymic))
            {
                var symbol = patronymic.TrimStart().Substring(0, 1).ToUpperInvariant();
                fullName.Append(" ").Append(symbol).Append(".");
            }

            return fullName.ToString();
        }
    }
}