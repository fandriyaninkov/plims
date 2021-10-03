using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinqToDB;
using PLIMS.DataAccess.DTO;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.DataAccess.Settings;

namespace PLIMS.DataAccess.Providers
{
    public class PointsProvider : IPointsProvider
    {
        private readonly AppDataConnection _connection;

        public PointsProvider(AppDataConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<SamplingPointDTO>> GetPointsByPlaceId(int placeId)
        {
            var res = await _connection.Points.Where(x => x.PlaceId.HasValue && x.PlaceId.Value == placeId)
                .Select(x => new SamplingPointDTO {Id = x.Id.Value, Name = x.Name})
                .ToListAsync().ConfigureAwait(false);

            return res;
        }

        public async Task<PointEntity> GetPoint(int id) =>
            await _connection.Points.FirstOrDefaultAsync(x => x.Id == id).ConfigureAwait(false);

        public async Task<bool> CreateOrUpdatePoint(PointEntity point)
        {
            if (point.Id.HasValue)
            {
                var res = await _connection.UpdateAsync(point).ConfigureAwait(false);
                return true;
            }

            var result = await _connection.InsertAsync(point).ConfigureAwait(false);
            return true;
        }

        public async Task<bool> DeletePoint(int id)
        {
            var res = await _connection.Points.DeleteAsync(x => x.Id.Value == id).ConfigureAwait(false);
            return true;
        }
    }
}