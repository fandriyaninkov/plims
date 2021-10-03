using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.Models.ViewModels;
using PLIMS.Models.ViewModels.ChemicalAnalysis;

namespace PLIMS.Business.Services.Interfaces
{
    public interface ISamplingPlaceService
    {
        Task<IEnumerable<SamplingPlaceViewModel>> GetSamplingPlacesInfo();
        Task<IEnumerable<ChemicalAnalysisTreeItem>> GetTree();
        Task<SamplingPlaceViewModel> GetSamplingPlace(int id);
        Task<bool> CreateSamplingPlace(SamplingPlaceViewModel place);
        Task<bool> UpdateSamplingPlace(SamplingPlaceViewModel place);
        Task<bool> DeleteSamplingPlace(int id);
    }
}