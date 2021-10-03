using System;
using LinqToDB.Mapping;

namespace PLIMS.DataAccess.Entities
{
    [Table(Name = "GasCondensateContentWmr")]
    public class GasCondensateContentWmrEntity
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
        public int PointId { get; set; }
        
        [Column]
        public int UserId { get; set; }
    }
}