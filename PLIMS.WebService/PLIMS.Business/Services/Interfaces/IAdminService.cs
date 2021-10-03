using System.Collections.Generic;
using PLIMS.Models.ViewModels.Admin;

namespace PLIMS.Business.Services.Interfaces
{
    public interface IAdminService
    {
        IEnumerable<AdminTreeItemInfo> GetAdminTree();
    }
}