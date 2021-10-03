using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.DataAccess.DTO;
using PLIMS.DataAccess.Entities;

namespace PLIMS.DataAccess.Providers.Interfaces
{
    public interface IGasCondensateContentWmrProvider
    {
        Task<IEnumerable<GasCondensateContentWmrDTO>> GetGasCondensateContentWmrByFilter(int placeId, int? pointId,
            DateTime? startDate, DateTime? endDate);

        Task<IEnumerable<GasCondensateContentWmrChartDTO>> GetGasCondensateContentWmrChartInfo(int placeId,
            int? pointId, DateTime startDate, DateTime endDate);

        Task<MinMaxDatesDTO> GetMinMaxDates(int placeId, int? pointId);

        Task<GasCondensateContentWmrEditDTO> GetGasCondensateContentWmrById(int id);
        Task<bool> CreateOrUpdateGasCondensateContentWmr(GasCondensateContentWmrEntity entity);
        Task<bool> DeleteGasCondensateContentWmr(int id);
    }
}