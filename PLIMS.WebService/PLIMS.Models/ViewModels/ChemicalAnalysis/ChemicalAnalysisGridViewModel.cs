using System;

namespace PLIMS.Models.ViewModels.ChemicalAnalysis
{
    public class ChemicalAnalysisGridViewModel
    {
        public int Id { get; set; }
        public string RegCode { get; set; }
        
        public string SamplingPlace { get; set; }
        
        public DateTime SamplingDate { get; set; }
        public DateTime DeliveringDate { get; set; }
        public DateTime AnalysisDate { get; set; }
        
        public string LaboratoryAssistant { get; set; }
        public string SamplingPoint { get; set; }
    }
}