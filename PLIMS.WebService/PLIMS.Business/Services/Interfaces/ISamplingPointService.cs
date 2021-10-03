using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.Models.ViewModels;
using PLIMS.Models.ViewModels.ChemicalAnalysis;

namespace PLIMS.Business.Services.Interfaces
{
    public interface ISamplingPointService
    {
        Task<IEnumerable<SamplingPointViewModel>> GetSamplingPointsInfo();
        Task<IEnumerable<SamplingPointViewModel>> GetSamplingPointsByPlaceId(int placeId);
        Task<IEnumerable<ChemicalAnalysisTreeItem>> GetPointChildItems(int placeId);
        Task<SamplingPointFullViewModel> GetPoint(int id);
        Task<bool> CreatePoint(SamplingPointFullViewModel point);
        Task<bool> UpdatePoint(SamplingPointFullViewModel point);
        Task<bool> DeletePoint(int id);
    }
}