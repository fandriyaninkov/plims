using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PLIMS.Business.Services.Interfaces;
using PLIMS.Models.ViewModels.Admin;

namespace PLIMS.WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("tree")]
        [Produces("application/json")]
        public IEnumerable<AdminTreeItemInfo> GetTree() => _adminService.GetAdminTree();
    }
}