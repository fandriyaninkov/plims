using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PLIMS.Business.Services.Interfaces;
using PLIMS.Common;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.Models.ViewModels;
using PLIMS.Models.ViewModels.Charts;
using PLIMS.Models.ViewModels.GasCondensateContentWmr;

namespace PLIMS.Business.Services
{
    public class GasCondensateContentWmrService : IGasCondensateContentWmrService
    {
        private readonly IGasCondensateContentWmrProvider _gasCondensateContentWmrProvider;
        private readonly IMapper _mapper;

        public GasCondensateContentWmrService(IGasCondensateContentWmrProvider gasCondensateContentWmrProvider, IMapper mapper)
        {
            _gasCondensateContentWmrProvider = gasCondensateContentWmrProvider;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GasCondensateContentWmrTableViewModel>> GetGasCondensateContentWmrByFilter(int placeId, int? pointId, DateTime? startDate, DateTime? endDate)
        {
            var entities = await _gasCondensateContentWmrProvider
                .GetGasCondensateContentWmrByFilter(placeId, pointId, startDate, endDate).ConfigureAwait(false);
            return _mapper.Map<IEnumerable<GasCondensateContentWmrTableViewModel>>(entities);
        }

        public async Task<ChartViewModel> GetChartInfoOfGasCondensateContentWmr(int placeId, int? pointId, DateTime startDate, DateTime endDate)
        {
            var chartEntity = await _gasCondensateContentWmrProvider
                .GetGasCondensateContentWmrChartInfo(placeId, pointId, startDate, endDate).ConfigureAwait(false);
            var minMaxDates = await _gasCondensateContentWmrProvider.GetMinMaxDates(placeId, pointId)
                .ConfigureAwait(false);
            var groupsByPointId = chartEntity.GroupBy(x => x.Point.Id).Select(x => x.Key);

            var chartInfo = new ChartViewModel();
            chartInfo.TimeScaleBounding = new TimeScaleBoundingViewModel
            {
                StartDate = minMaxDates.StartDate.Value,
                EndDate = minMaxDates.EndDate.Value
            };
            
            var lines = new List<LineViewModel>();
            var sameColor = new List<string>();
            foreach (var groupPointId in groupsByPointId)
            {
                var line= new LineViewModel();
                var simpleChartEntity = chartEntity.FirstOrDefault(x => x.Point.Id == groupPointId);
                line.PointInfo = _mapper.Map<SamplingPointViewModel>(simpleChartEntity);
                line.Title = line.PointInfo.Name;
                var color = ColorUtils.ColorGenerator(sameColor.ToArray());
                line.LineColor = color;
                sameColor.Add(color);
                line.Points =
                    _mapper.Map<IEnumerable<PointViewModel>>(chartEntity.Where(x => x.Point.Id == groupPointId));
                lines.Add(line);

            }

            chartInfo.Lines = lines;
            return chartInfo;
        }

        public async Task<GasCondensateContentWmrViewModel> GetGasCondensateContentWmrById(int id)
        {
            var entity = await _gasCondensateContentWmrProvider.GetGasCondensateContentWmrById(id)
                .ConfigureAwait(false);
            return _mapper.Map<GasCondensateContentWmrViewModel>(entity);
        }

        public async Task<bool> CreateGasCondensateContentWmr(GasCondensateContentWmrViewModel model)
        {
            var entity = _mapper.Map<GasCondensateContentWmrEntity>(model);
            return await _gasCondensateContentWmrProvider.CreateOrUpdateGasCondensateContentWmr(entity)
                .ConfigureAwait(false);
        }

        public async Task<bool> UpdateGasCondensateContentWmr(GasCondensateContentWmrViewModel model)
        {
            var entity = _mapper.Map<GasCondensateContentWmrEntity>(model);
            return await _gasCondensateContentWmrProvider.CreateOrUpdateGasCondensateContentWmr(entity)
                .ConfigureAwait(false);
        }

        public async Task<bool> DeleteGasCondensateContentWmr(int id) => await _gasCondensateContentWmrProvider
            .DeleteGasCondensateContentWmr(id).ConfigureAwait(false);
    }
}