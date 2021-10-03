using System;

namespace PLIMS.Models.ViewModels.GasCondensateContentWmr
{
    public class GasCondensateContentWmrTableViewModel
    {
        public int Id { get; set; }
        public string RegCode { get; set; }
        
        public DateTime? SamplingDate { get; set; }
        public DateTime? DeliveringDate { get; set; }
        public DateTime? AnalysisDate { get; set; }
        
        public int? WmrContent { get; set; }
        
        public string SamplingPlace { get; set; }
        public string LaboratoryAssistant { get; set; }
    }
}