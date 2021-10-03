using System.Collections.Generic;

namespace PLIMS.Models.ViewModels.Charts
{
    public class ChartViewModel
    {
        public TimeScaleBoundingViewModel TimeScaleBounding { get; set; }
        public IEnumerable<LineViewModel> Lines { get; set; }
    }
}