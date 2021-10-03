using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.DataAccess.Entities;

namespace PLIMS.DataAccess.Providers.Interfaces
{
    public interface IPlacesProvider
    {
        Task<IEnumerable<SamplingPlacesEntity>> GetPlaces();
        Task<SamplingPlacesEntity> GetPlace(int id);
        Task<bool> CreateOrUpdatePlace(SamplingPlacesEntity place);
        Task<bool> DeletePlace(int id);
    }
}