using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using PLIMS.Business.Services.Interfaces;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.Models.ViewModels.ChemicalAnalysis;

namespace PLIMS.Business.Services
{
    public class ChemicalAnalysisService : IChemicalAnalysisService
    {
        private readonly IChemicalAnalysisProvider _chemicalAnalysisProvider;
        private readonly IMapper _mapper;

        public ChemicalAnalysisService(IChemicalAnalysisProvider chemicalAnalysisProvider, IMapper mapper)
        {
            _chemicalAnalysisProvider = chemicalAnalysisProvider;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ChemicalAnalysisGridViewModel>> GetChemicalAnalyses()
        {
            var entities = await _chemicalAnalysisProvider.GetAnalysisInfo().ConfigureAwait(false);
            var result = _mapper.Map<IEnumerable<ChemicalAnalysisGridViewModel>>(entities);

            return result;
        }

        public async Task<IEnumerable<ChemicalAnalysisGridViewModel>> GetChemicalAnalysesByFilter(int placeId, int? pointId, DateTime? date)
        {
            var entities = await _chemicalAnalysisProvider.GetChemicalAnalysesByFilter(placeId, pointId, date)
                .ConfigureAwait(false);
            var result = _mapper.Map<IEnumerable<ChemicalAnalysisGridViewModel>>(entities);

            return result;
        }

        public async Task<ChemicalAnalysisViewModel> GetChemicalAnalysesById(int id)
        {
            var entity = await _chemicalAnalysisProvider.GetAnalysisById(id).ConfigureAwait(false);
            var result = _mapper.Map<ChemicalAnalysisViewModel>(entity);

            return result;
        }

        public async Task<bool> CreateChemicalAnalysis(ChemicalAnalysisViewModel model)
        {
            var entity = _mapper.Map<ChemicalAnalysisEntity>(model);

            return await _chemicalAnalysisProvider.CreateOrUpdateAnalysis(entity).ConfigureAwait(false);
        }

        public async Task<bool> UpdateChemicalAnalysis(ChemicalAnalysisViewModel model)
        {
            var entity = _mapper.Map<ChemicalAnalysisEntity>(model);

            return await _chemicalAnalysisProvider.CreateOrUpdateAnalysis(entity).ConfigureAwait(false);
        }

        public async Task<bool> DeleteChemicalAnalysis(int id)
        {
            return await _chemicalAnalysisProvider.DeleteAnalysis(id).ConfigureAwait(false);
        }
    }
}