using System;

namespace PLIMS.Common
{
    public static class DateUtils
    {
        public static DateTime? ConvertToCurrentTimeZone(DateTime? utcDate)
        {
            if (utcDate.HasValue)
            {
                return TimeZoneInfo.ConvertTimeFromUtc(utcDate.Value, TimeZoneInfo.Local);
            }

            return null;
        }

        public static DateTime? ConvertToUtc(DateTime? localDateTime)
        {
            if (localDateTime.HasValue)
            {
                return TimeZoneInfo.ConvertTimeToUtc(localDateTime.Value);
            }

            return null;
        }
    }
}