using System;
using System.Collections;
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
    public class SamplingPointService : ISamplingPointService
    {
        private readonly IPointsProvider _pointsProvider;
        private readonly IMapper _mapper;

        public SamplingPointService(IPointsProvider pointsProvider, IMapper mapper)
        {
            _pointsProvider = pointsProvider;
            _mapper = mapper;
        }

        public Task<IEnumerable<SamplingPointViewModel>> GetSamplingPointsInfo()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<SamplingPointViewModel>> GetSamplingPointsByPlaceId(int placeId)
        {
            var entities = await _pointsProvider.GetPointsByPlaceId(placeId).ConfigureAwait(false);
            var result = _mapper.Map<IEnumerable<SamplingPointViewModel>>(entities);

            return result;
        }

        public async Task<IEnumerable<ChemicalAnalysisTreeItem>> GetPointChildItems(int placeId)
        {
            var entities = await _pointsProvider.GetPointsByPlaceId(placeId).ConfigureAwait(false);
            var result = _mapper.Map<IEnumerable<ChemicalAnalysisTreeItem>>(entities, opt => opt.AfterMap((src, dest) =>
            {
                foreach (var chemicalAnalysisTreeItem in dest)
                {
                    chemicalAnalysisTreeItem.ParentId = placeId;
                }
            }));

            return result;
        }

        public async Task<SamplingPointFullViewModel> GetPoint(int id)
        {
            var entity = await _pointsProvider.GetPoint(id).ConfigureAwait(false);
            return _mapper.Map<SamplingPointFullViewModel>(entity);
        }

        public async Task<bool> CreatePoint(SamplingPointFullViewModel point)
        {
            var entity = _mapper.Map<PointEntity>(point);
            return await _pointsProvider.CreateOrUpdatePoint(entity).ConfigureAwait(false);
        }

        public async Task<bool> UpdatePoint(SamplingPointFullViewModel point)
        {
            var entity = _mapper.Map<PointEntity>(point);
            return await _pointsProvider.CreateOrUpdatePoint(entity).ConfigureAwait(false);
        }

        public async Task<bool> DeletePoint(int id) => await _pointsProvider.DeletePoint(id).ConfigureAwait(false);
    }
}