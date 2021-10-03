﻿using System;

namespace PLIMS.DataAccess.DTO
{
    public class ChemicalAnalysisDTO
    {
        public int Id { get; set; }
        public string RegCode { get; set; }
        
        public DateTime? SamplingDate { get; set; }
        public DateTime? DeliveringDate { get; set; }
        public DateTime? AnalysisDate { get; set; }
        
        public string PlaceName { get; set; }
        public string UserName { get; set; }
        public string PointName { get; set; }
    }
}