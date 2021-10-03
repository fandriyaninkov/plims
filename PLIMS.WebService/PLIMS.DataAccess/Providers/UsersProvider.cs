using System.Collections.Generic;
using System.Threading.Tasks;
using LinqToDB;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.DataAccess.Settings;

namespace PLIMS.DataAccess.Providers
{
    public class UsersProvider : IUsersProvider
    {
        private readonly AppDataConnection _connection;

        public UsersProvider(AppDataConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<UserEntity>> GetUsers()
        {
            var res = await _connection.Users.ToListAsync().ConfigureAwait(false);

            return res;
        }

        public async Task<bool> CreateOrUpdateUser(UserEntity user)
        {
            if (user.Id.HasValue)
            {
                var res = await _connection.UpdateAsync(user).ConfigureAwait(false);
                return true;
            }

            var result = await _connection.InsertAsync(user).ConfigureAwait(false);
            return true;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var res = await _connection.Users.DeleteAsync(x => x.Id.Value == id).ConfigureAwait(false);
            return true;
        }
    }
}