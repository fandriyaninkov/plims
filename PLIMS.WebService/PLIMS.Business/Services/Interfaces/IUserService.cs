using System.Collections.Generic;
using System.Threading.Tasks;
using PLIMS.Models.ViewModels;

namespace PLIMS.Business.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserShortInfoViewModel>> GetShortUserInfo();
        Task<IEnumerable<UserViewModel>> GetAllUsers();
        Task<bool> UpdateUser(UserViewModel user);
        Task<bool> CreateUser(UserViewModel user);
        Task<bool> DeleteUser(int id);
    }
}