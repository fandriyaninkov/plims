using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.Models.ViewModels.Charts;
using PLIMS.Models.ViewModels.GasCondensateContentWmr;

namespace PLIMS.Business.Services.Interfaces
{
    public interface IGasCondensateContentWmrService
    {
        Task<IEnumerable<GasCondensateContentWmrTableViewModel>> GetGasCondensateContentWmrByFilter(int placeId,
            int? pointId, DateTime? startDate, DateTime? endDate);

        Task<ChartViewModel> GetChartInfoOfGasCondensateContentWmr(int placeId,
            int? pointId, DateTime startDate, DateTime endDate);

        Task<GasCondensateContentWmrViewModel> GetGasCondensateContentWmrById(int id);
        Task<bool> CreateGasCondensateContentWmr(GasCondensateContentWmrViewModel model);
        Task<bool> UpdateGasCondensateContentWmr(GasCondensateContentWmrViewModel model);
        Task<bool> DeleteGasCondensateContentWmr(int id);
    }
}