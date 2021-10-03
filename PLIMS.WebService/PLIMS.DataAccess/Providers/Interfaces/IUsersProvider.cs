using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.DataAccess.Entities;

namespace PLIMS.DataAccess.Providers.Interfaces
{
    public interface IUsersProvider
    {
        Task<IEnumerable<UserEntity>> GetUsers();
        Task<bool> CreateOrUpdateUser(UserEntity user);
        Task<bool> DeleteUser(int id);
    }
}