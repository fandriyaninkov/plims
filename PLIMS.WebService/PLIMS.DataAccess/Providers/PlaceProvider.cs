using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinqToDB;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.DataAccess.Settings;

namespace PLIMS.DataAccess.Providers
{
    public class PlaceProvider : IPlacesProvider
    {
        private readonly AppDataConnection _connection;

        public PlaceProvider(AppDataConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<SamplingPlacesEntity>> GetPlaces() =>
            await _connection.Places.ToListAsync().ConfigureAwait(false);

        public async Task<SamplingPlacesEntity> GetPlace(int id) =>
            await _connection.Places.FirstOrDefaultAsync(x => x.Id == id).ConfigureAwait(false);

        public async Task<bool> CreateOrUpdatePlace(SamplingPlacesEntity place)
        {
            if (place.Id.HasValue)
            {
                var res = await _connection.UpdateAsync(place).ConfigureAwait(false);
                return true;
            }

            var result = await _connection.InsertAsync(place).ConfigureAwait(false);
            return true;
        }

        public async Task<bool> DeletePlace(int id)
        {
            var resPoint = await _connection.Points.DeleteAsync(x => x.PlaceId == id).ConfigureAwait(false);
            var resPlace = await _connection.Places.DeleteAsync(x => x.Id == id).ConfigureAwait(false);

            return true;
        }
    }
}