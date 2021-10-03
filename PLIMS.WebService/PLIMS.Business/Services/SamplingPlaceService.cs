using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using PLIMS.Business.Services.Interfaces;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.Models.ViewModels;
using PLIMS.Models.ViewModels.ChemicalAnalysis;

namespace PLIMS.Business.Services
{
    public class SamplingPlaceService : ISamplingPlaceService
    {
        private readonly IPlacesProvider _placesProvider;
        private readonly IMapper _mapper;

        public SamplingPlaceService(IPlacesProvider placesProvider, IMapper mapper)
        {
            _placesProvider = placesProvider;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SamplingPlaceViewModel>> GetSamplingPlacesInfo()
        {
            var entities = await _placesProvider.GetPlaces().ConfigureAwait(false);
            var result = _mapper.Map<IEnumerable<SamplingPlaceViewModel>>(entities);

            return result;
        }

        public async Task<IEnumerable<ChemicalAnalysisTreeItem>> GetTree()
        {
            var entities = await _placesProvider.GetPlaces().ConfigureAwait(false);
            var result =
                _mapper.Map<IEnumerable<ChemicalAnalysisTreeItem>>(entities);

            return result;
        }

        public async Task<SamplingPlaceViewModel> GetSamplingPlace(int id)
        {
            var entity = await _placesProvider.GetPlace(id).ConfigureAwait(false);
            return _mapper.Map<SamplingPlaceViewModel>(entity);
        }

        public async Task<bool> CreateSamplingPlace(SamplingPlaceViewModel place)
        {
            var entity = _mapper.Map<SamplingPlacesEntity>(place);
            return await _placesProvider.CreateOrUpdatePlace(entity).ConfigureAwait(false);
        }

        public async Task<bool> UpdateSamplingPlace(SamplingPlaceViewModel place)
        {
            var entity = _mapper.Map<SamplingPlacesEntity>(place);
            return await _placesProvider.CreateOrUpdatePlace(entity).ConfigureAwait(false);
        }

        public async Task<bool> DeleteSamplingPlace(int id) =>
            await _placesProvider.DeletePlace(id).ConfigureAwait(false);
    }
}