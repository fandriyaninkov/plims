using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.DataAccess.DTO;
using PLIMS.DataAccess.Entities;

namespace PLIMS.DataAccess.Providers.Interfaces
{
    public interface IPointsProvider
    {
        Task<IEnumerable<SamplingPointDTO>> GetPointsByPlaceId(int placeId);
        Task<PointEntity> GetPoint(int id);
        Task<bool> CreateOrUpdatePoint(PointEntity point);
        Task<bool> DeletePoint(int id);
    }
}