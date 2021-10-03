using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.Models.ViewModels.ChemicalAnalysis;

namespace PLIMS.Business.Services.Interfaces
{
    public interface IChemicalAnalysisService
    {
        Task<IEnumerable<ChemicalAnalysisGridViewModel>> GetChemicalAnalyses();

        Task<IEnumerable<ChemicalAnalysisGridViewModel>> GetChemicalAnalysesByFilter(int placeId, int? pointId,
            DateTime? date);
        Task<ChemicalAnalysisViewModel> GetChemicalAnalysesById(int id);
        Task<bool> CreateChemicalAnalysis(ChemicalAnalysisViewModel model);
        Task<bool> UpdateChemicalAnalysis(ChemicalAnalysisViewModel model);
        Task<bool> DeleteChemicalAnalysis(int id);
    }
}