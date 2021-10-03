using System;

namespace PLIMS.Models.ViewModels.GasCondensateContentWmr
{
    public class GasCondensateContentWmrViewModel
    {
        public int? Id { get; set; }
        public string RegCode { get; set; }
        
        public DateTime? SamplingDate { get; set; }
        public DateTime? DeliveringDate { get; set; }
        public DateTime? AnalysisDate { get; set; }
        
        public int WmrContent { get; set; }
        
        public SamplingPlaceViewModel Place { get; set; }
        public SamplingPointViewModel Point { get; set; }
        public UserShortInfoViewModel User { get; set; }
    }
}