using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PLIMS.Business.Services.Interfaces;
using PLIMS.Models.ViewModels;

namespace PLIMS.WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("short")]
        [Produces("application/json")]
        public async Task<IEnumerable<UserShortInfoViewModel>> GetShortUserInfo() => 
            await _userService.GetShortUserInfo().ConfigureAwait(false);

        [HttpGet("all")]
        [Produces("application/json")]
        public async Task<IEnumerable<UserViewModel>> GetAllUsers() =>
            await _userService.GetAllUsers().ConfigureAwait(false);

        [HttpPost]
        public async Task<bool> CreateUser([FromBody] UserViewModel user) =>
            await _userService.CreateUser(user).ConfigureAwait(false);

        [HttpPut]
        public async Task<bool> UpdateUser([FromBody] UserViewModel user) =>
            await _userService.UpdateUser(user).ConfigureAwait(false);

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<bool> DeleteUser(int id) => await _userService.DeleteUser(id).ConfigureAwait(false);
    }
}