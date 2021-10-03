using System;

namespace PLIMS.DataAccess.DTO
{
    public class ChemicalAnalysisEditDTO
    {
        public int Id { get; set; }
        
        public string RegCode { get; set; }
        
        public DateTime? DeliveringDate { get; set; }
        public DateTime? AnalysisDate { get; set; }
        public DateTime? SamplingDate { get; set; }
        
        public int? WmrContent { get; set; }
        public int? CondensateContent { get; set; }
        
        public double? MassFractionOfMethanol { get; set; }
        public double? MassFractionOfMethanolError { get; set; }
        public bool MassFractionOfMethanolNotAvailable { get; set; }
        
        public double? MassFractionOfWater { get; set; }
        public double? MassFractionOfWaterError { get; set; }
        public bool MassFractionOfWaterNotAvailable { get; set; }
        
        public int? MassConcentrationOfCorrosionInhibitor { get; set; }
        public bool MassConcentrationOfCorrosionInhibitorNotAvailable { get; set; }
        
        public IdNameDTO Point { get; set; }
        public IdNameDTO Place { get; set; }
        public IdNameDTO User { get; set; }
    }
}