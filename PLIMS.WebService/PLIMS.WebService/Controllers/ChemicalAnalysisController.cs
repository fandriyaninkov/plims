using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PLIMS.Business.Services.Interfaces;
using PLIMS.Models.ViewModels.ChemicalAnalysis;

namespace PLIMS.WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChemicalAnalysisController : Controller
    {
        private readonly IChemicalAnalysisService _chemicalAnalysisService;

        public ChemicalAnalysisController(IChemicalAnalysisService chemicalAnalysisService)
        {
            _chemicalAnalysisService = chemicalAnalysisService;
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<IEnumerable<ChemicalAnalysisGridViewModel>> GetAnalysis()
        {
            var result = await _chemicalAnalysisService.GetChemicalAnalyses().ConfigureAwait(false);
            return result;
        }

        [HttpGet]
        [Route("filter/{placeId:int}")]
        [Produces("application/json")]
        public async Task<IEnumerable<ChemicalAnalysisGridViewModel>> GetAnalysisByFilter(int placeId, [FromQuery]int? pointId = null, [FromQuery]DateTime? date = null)
        {
            return await _chemicalAnalysisService.GetChemicalAnalysesByFilter(placeId, pointId, date)
                .ConfigureAwait(false);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Produces("application/json")]
        public async Task<ChemicalAnalysisViewModel> GetAnalysisById( int id)
        {
            var result = await _chemicalAnalysisService.GetChemicalAnalysesById(id).ConfigureAwait(false);
            return result;
        }

        [HttpPost]
        [Route("")]
        public async Task<bool> CreateAnalysis([FromBody] ChemicalAnalysisViewModel model)
        {
            return await _chemicalAnalysisService.CreateChemicalAnalysis(model).ConfigureAwait(false);
        }

        [HttpPut]
        public async Task<bool> UpdateAnalysis([FromBody] ChemicalAnalysisViewModel model)
        {
            return await _chemicalAnalysisService.UpdateChemicalAnalysis(model).ConfigureAwait(false);
        }

        [HttpDelete()]
        [Route("{id:int}")]
        public async Task<bool> DeleteAnalysis(int id)
        {
            return await _chemicalAnalysisService.DeleteChemicalAnalysis(id).ConfigureAwait(false);
        }
    }
}