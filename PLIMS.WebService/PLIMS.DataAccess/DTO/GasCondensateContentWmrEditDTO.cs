using System;

namespace PLIMS.DataAccess.DTO
{
    public class GasCondensateContentWmrEditDTO
    {
        public int Id { get; set; }
        public string RegCode { get; set; }
        
        public DateTime? DeliveringDate { get; set; }
        public DateTime? SamplingDate { get; set; }
        public DateTime? AnalysisDate { get; set; }
        
        public int? WmrContent { get; set; }
        
        public IdNameDTO Point { get; set; }
        public IdNameDTO Place { get; set; }
        public IdNameDTO User { get; set; }
    }
}