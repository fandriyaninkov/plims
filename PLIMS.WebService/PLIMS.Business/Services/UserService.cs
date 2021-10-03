using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using PLIMS.Business.Services.Interfaces;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.Models.ViewModels;

namespace PLIMS.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUsersProvider _usersProvider;
        private readonly IMapper _mapper;

        public UserService(IUsersProvider usersProvider, IMapper mapper)
        {
            _usersProvider = usersProvider;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserShortInfoViewModel>> GetShortUserInfo()
        {
            var entities = await _usersProvider.GetUsers().ConfigureAwait(false);
            var result = _mapper.Map<IEnumerable<UserShortInfoViewModel>>(entities);

            return result;
        }

        public async Task<IEnumerable<UserViewModel>> GetAllUsers()
        {
            var entities = await _usersProvider.GetUsers().ConfigureAwait(false);
            var result = _mapper.Map<IEnumerable<UserViewModel>>(entities);

            return result;
        }

        public async Task<bool> UpdateUser(UserViewModel user)
        {
            var entity = _mapper.Map<UserEntity>(user);
            return await _usersProvider.CreateOrUpdateUser(entity).ConfigureAwait(false);
        }

        public async Task<bool> CreateUser(UserViewModel user)
        {
            var entity = _mapper.Map<UserEntity>(user);
            return await _usersProvider.CreateOrUpdateUser(entity).ConfigureAwait(false);
        }

        public async Task<bool> DeleteUser(int id) => await _usersProvider.DeleteUser(id).ConfigureAwait(false);
    }
}