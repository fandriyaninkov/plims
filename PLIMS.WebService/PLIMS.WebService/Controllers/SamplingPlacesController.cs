using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PLIMS.Business.Services.Interfaces;
using PLIMS.Models.ViewModels;
using PLIMS.Models.ViewModels.ChemicalAnalysis;

namespace PLIMS.WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SamplingPlacesController : Controller
    {
        private readonly ISamplingPlaceService _samplingPlaceService;

        public SamplingPlacesController(ISamplingPlaceService samplingPlaceService)
        {
            _samplingPlaceService = samplingPlaceService;
        }

        [HttpGet]
        public async Task<IEnumerable<SamplingPlaceViewModel>> GetSamplingPlacesInfo() =>
            await _samplingPlaceService.GetSamplingPlacesInfo().ConfigureAwait(false);

        [HttpGet]
        [Route("/tree")]
        [Produces("application/json")]
        public async Task<IEnumerable<ChemicalAnalysisTreeItem>> GetTree() =>
            await _samplingPlaceService.GetTree().ConfigureAwait(false);

        [HttpGet]
        [Route("/place/{id:int}")]
        public async Task<SamplingPlaceViewModel> GetSamplingPlace(int id) =>
            await _samplingPlaceService.GetSamplingPlace(id).ConfigureAwait(false);

        [HttpPost]
        [Route("/place")]
        public async Task<bool> CreateSamplingPlace([FromBody] SamplingPlaceViewModel place) =>
            await _samplingPlaceService.CreateSamplingPlace(place).ConfigureAwait(false);

        [HttpPut]
        [Route("/place")]
        public async Task<bool> UpdateSamplingPlace([FromBody] SamplingPlaceViewModel place) =>
            await _samplingPlaceService.UpdateSamplingPlace(place).ConfigureAwait(false);

        [HttpDelete]
        [Route("/place/{id:int}")]
        public async Task<bool> DeleteSamplingPlace(int id) =>
            await _samplingPlaceService.DeleteSamplingPlace(id).ConfigureAwait(false);
    }
}