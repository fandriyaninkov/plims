using System.Collections.Generic;
using PLIMS.Business.Services.Interfaces;
using PLIMS.Models.ViewModels.Admin;

namespace PLIMS.Business.Services
{
    public class AdminService : IAdminService
    {
        public IEnumerable<AdminTreeItemInfo> GetAdminTree()
        {
            var tree = new List<AdminTreeItemInfo>
            {
                new AdminTreeItemInfo {Name = "Исполнители", Url = "users", Type = AdminTreeItemType.Users},
                new AdminTreeItemInfo {Name = "Места отбора", Url = "places", Type = AdminTreeItemType.Places}
            };

            return tree;
        }
    }
}