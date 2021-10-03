using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinqToDB;
using LinqToDB.Reflection;
using PLIMS.Common;
using PLIMS.DataAccess.DTO;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.DataAccess.Settings;

namespace PLIMS.DataAccess.Providers
{
    public class GasCondensateContentWmrProvider : IGasCondensateContentWmrProvider
    {
        private readonly AppDataConnection _connection;

        public GasCondensateContentWmrProvider(AppDataConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<GasCondensateContentWmrDTO>> GetGasCondensateContentWmrByFilter(int placeId, int? pointId, DateTime? startDate, DateTime? endDate)
        {
            var query = from gasCondensate in _connection.GasCondensateContentWmr
                from pt in _connection.Points.Where(x => x.Id == gasCondensate.PointId).DefaultIfEmpty()
                from pl in _connection.Places.Where(x => x.Id == pt.PlaceId).DefaultIfEmpty()
                from u in _connection.Users.Where(x => x.Id == gasCondensate.UserId).DefaultIfEmpty()
                where pl.Id == placeId
                      && (!pointId.HasValue || pointId.Value == pt.Id)
                      && (!startDate.HasValue || (gasCondensate.SamplingDate.HasValue &&
                                                  startDate.Value <= gasCondensate.SamplingDate.Value))
                      && (!endDate.HasValue || (gasCondensate.SamplingDate.HasValue &&
                                                endDate.Value >= gasCondensate.SamplingDate.Value))
                select
                    new GasCondensateContentWmrDTO
                    {
                        Id = gasCondensate.Id.Value,
                        AnalysisDate = gasCondensate.AnalysisDate,
                        DeliveringDate = gasCondensate.DeliveringDate,
                        SamplingDate = gasCondensate.SamplingDate,
                        RegCode = gasCondensate.RegCode,
                        WmrContent = gasCondensate.WmrContent,
                        PlaceName = pl.Name,
                        UserName = StringUtils.GetFullName(u.FirstName, u.LastName, u.Patronymic)
                    };

            var res = await query.ToListAsync().ConfigureAwait(false);

            return res;
        }

        public async Task<IEnumerable<GasCondensateContentWmrChartDTO>> GetGasCondensateContentWmrChartInfo(int placeId, int? pointId, DateTime startDate, DateTime endDate)
        {
            var query = from gasCon in _connection.GasCondensateContentWmr
                from pt in _connection.Points.Where(x => x.Id == gasCon.PointId).DefaultIfEmpty()
                from pl in _connection.Places.Where(x => x.Id == pt.PlaceId).DefaultIfEmpty()
                where pl.Id == placeId
                      && (!pointId.HasValue || pointId.Value == pt.Id)
                      && (gasCon.SamplingDate.HasValue && startDate <= gasCon.SamplingDate.Value)
                      && (gasCon.SamplingDate.HasValue && endDate >= gasCon.SamplingDate.Value)
                select new GasCondensateContentWmrChartDTO
                {
                    SamplingDate = gasCon.SamplingDate.Value,
                    WmrContent = gasCon.WmrContent.Value,
                    Point = new IdNameDTO {Id = pt.Id.Value, Name = pt.Name}
                };

            var res = await query.ToListAsync().ConfigureAwait(false);
            return res;
        }

        public async Task<MinMaxDatesDTO> GetMinMaxDates(int placeId, int? pointId)
        {
            var query = (from gasCon in _connection.GasCondensateContentWmr
                from pt in _connection.Points.Where(x => x.Id == gasCon.PointId).DefaultIfEmpty()
                from pl in _connection.Places.Where(x => x.Id == pt.PlaceId).DefaultIfEmpty()
                where pl.Id == placeId
                      && (!pointId.HasValue || pointId.Value == pt.Id)

                select new
                {
                    PlaceId = pl.Id,
                    SamplingDate = gasCon.SamplingDate
                })
                .GroupBy(x => x.PlaceId)
                .Select(t => new MinMaxDatesDTO
                {
                    StartDate = t.Min(z => z.SamplingDate), 
                    EndDate = t.Max(z => z.SamplingDate)
                });
            var res = await query.FirstOrDefaultAsync().ConfigureAwait(false);

            return res;
        }

        public async Task<GasCondensateContentWmrEditDTO> GetGasCondensateContentWmrById(int id)
        {
            var query = from gc in _connection.GasCondensateContentWmr
                from pt in _connection.Points.Where(x => x.Id == gc.PointId).DefaultIfEmpty()
                from pl in _connection.Places.Where(x => x.Id == pt.PlaceId).DefaultIfEmpty()
                from u in _connection.Users.Where(x => x.Id == gc.UserId).DefaultIfEmpty()
                where gc.Id == id
                select new GasCondensateContentWmrEditDTO
                {
                    Id = gc.Id.Value,
                    RegCode = gc.RegCode,
                    AnalysisDate = gc.AnalysisDate,
                    DeliveringDate = gc.DeliveringDate,
                    SamplingDate = gc.SamplingDate,
                    WmrContent = gc.WmrContent,
                    Place = new IdNameDTO {Id = pl.Id.Value, Name = pl.Name},
                    Point = new IdNameDTO {Id = pt.Id.Value, Name = pt.Name},
                    User = new IdNameDTO
                        {Id = u.Id.Value, Name = StringUtils.GetFullName(u.FirstName, u.LastName, u.Patronymic)}
                };

            var res = await query.FirstAsync().ConfigureAwait(false);

            return res;
        }

        public async Task<bool> CreateOrUpdateGasCondensateContentWmr(GasCondensateContentWmrEntity entity)
        {
            if (entity.Id.HasValue)
            {
                var res = await _connection.UpdateAsync(entity).ConfigureAwait(false);
                return true;
            }

            var result = await _connection.InsertAsync(entity).ConfigureAwait(false);
            return true;
        }

        public async Task<bool> DeleteGasCondensateContentWmr(int id)
        {
            var res = await _connection.GasCondensateContentWmr.DeleteAsync(x => x.Id.Value == id)
                .ConfigureAwait(false);
            return true;
        }
    }
}