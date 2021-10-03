using System;
using LinqToDB.Mapping;

namespace PLIMS.DataAccess.Entities
{
    [Table(Name = "ChemicalAnalysis")]
    public class ChemicalAnalysisEntity
    {
        [PrimaryKey, Identity]
        public int? Id { get; set; }
        
        [Column]
        public string RegCode { get; set; }
        
        [Column]
        public DateTime? DeliveringDate { get; set; }
        
        [Column]
        public DateTime? AnalysisDate { get; set; }
        
        [Column]
        public DateTime? SamplingDate { get; set; }
        
        [Column]
        public int? WmrContent { get; set; }
        
        [Column]
        public int? CondensateContent { get; set; }
        
        [Column]
        public double? MassFractionOfMethanol { get; set; }
        
        [Column]
        public double? MassFractionOfMethanolError { get; set; }
        
        [Column]
        public bool MassFractionOfMethanolNotAvailable { get; set; }
        
        [Column]
        public double? MassFractionOfWater { get; set; }
        
        [Column]
        public double? MassFractionOfWaterError { get; set; }
        
        [Column]
        public bool MassFractionOfWaterNotAvailable { get; set; }
        
        [Column]
        public int? MassConcentrationOfCorrosionInhibitor { get; set; }
        
        [Column]
        public bool MassConcentrationOfCorrosionInhibitorNotAvailable { get; set; }
        
        [Column]
        public int PointId { get; set; }
        
        [Column]
        public int UserId { get; set; }
    }
}