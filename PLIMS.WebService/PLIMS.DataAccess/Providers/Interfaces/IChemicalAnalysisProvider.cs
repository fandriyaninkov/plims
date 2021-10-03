using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.DataAccess.DTO;
using PLIMS.DataAccess.Entities;

namespace PLIMS.DataAccess.Providers.Interfaces
{
    public interface IChemicalAnalysisProvider
    {
        Task<IEnumerable<ChemicalAnalysisDTO>> GetAnalysisInfo();
        Task<IEnumerable<ChemicalAnalysisDTO>> GetChemicalAnalysesByFilter(int placeId, int? pointId, DateTime? date);
        Task<ChemicalAnalysisEditDTO> GetAnalysisById(int analysisId);
        Task<bool> CreateOrUpdateAnalysis(ChemicalAnalysisEntity entity);
        Task<bool> DeleteAnalysis(int id);
    }
}