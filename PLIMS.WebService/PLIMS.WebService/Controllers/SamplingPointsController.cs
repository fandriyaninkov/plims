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
    public class SamplingPointsController : Controller
    {
        private readonly ISamplingPointService _samplingPointService;

        public SamplingPointsController(ISamplingPointService samplingPointService)
        {
            _samplingPointService = samplingPointService;
        }

        [HttpGet]
        public async Task<IEnumerable<SamplingPointViewModel>> GetSamplingPointsInfo() =>
            await _samplingPointService.GetSamplingPointsInfo().ConfigureAwait(false);

        [HttpGet]
        [Route("/{placeId:int}")]
        [Produces("application/json")]
        public async Task<IEnumerable<SamplingPointViewModel>> GetSamplingPointsByPlaceId(int placeId) =>
            await _samplingPointService.GetSamplingPointsByPlaceId(placeId).ConfigureAwait(false);

        [HttpGet]
        [Route("/tree/{placeId:int}")]
        [Produces("application/json")]
        public async Task<IEnumerable<ChemicalAnalysisTreeItem>> GetPointChildItems(int placeId) =>
            await _samplingPointService.GetPointChildItems(placeId).ConfigureAwait(false);

        [HttpGet]
        [Route("/point/{id:int}")]
        [Produces("application/json")]
        public async Task<SamplingPointFullViewModel> GetPoint(int id) =>
            await _samplingPointService.GetPoint(id).ConfigureAwait(false);

        [HttpPost]
        [Route("/point")]
        public async Task<bool> CreatePoint([FromBody] SamplingPointFullViewModel point) =>
            await _samplingPointService.CreatePoint(point).ConfigureAwait(false);

        [HttpPut]
        [Route("/point")]
        public async Task<bool> UpdatePoint([FromBody] SamplingPointFullViewModel point) =>
            await _samplingPointService.UpdatePoint(point).ConfigureAwait(false);

        [HttpDelete]
        [Route("/point/{id:int}")]
        public async Task<bool> DeletePoint(int id) =>
            await _samplingPointService.DeletePoint(id).ConfigureAwait(false);
    }
}