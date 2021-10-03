using System.Collections.Generic;

namespace PLIMS.Models.ViewModels.Charts
{
    public class LineViewModel
    {
        public string Title { get; set; }
        public string LineColor { get; set; }
        public SamplingPointViewModel PointInfo { get; set; }
        public IEnumerable<PointViewModel> Points { get; set; }
    }
}