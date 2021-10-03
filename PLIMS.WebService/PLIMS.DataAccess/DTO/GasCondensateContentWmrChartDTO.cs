using System;

namespace PLIMS.DataAccess.DTO
{
    public class GasCondensateContentWmrChartDTO
    {
        public IdNameDTO Point { get; set; }
        public DateTime SamplingDate { get; set; }
        public int WmrContent { get; set; }
    }
}