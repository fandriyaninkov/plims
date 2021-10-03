using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PLIMS.Business.Services.Interfaces;
using PLIMS.Models.ViewModels.Charts;
using PLIMS.Models.ViewModels.GasCondensateContentWmr;

namespace PLIMS.WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GasCondensateContentWmrController : Controller
    {
        private readonly IGasCondensateContentWmrService _gasCondensateContentWmrService;

        public GasCondensateContentWmrController(IGasCondensateContentWmrService gasCondensateContentWmrService)
        {
            _gasCondensateContentWmrService = gasCondensateContentWmrService;
        }

        [HttpGet]
        [Route("filter/{placeId:int}")]
        [Produces("application/json")]
        public async Task<IEnumerable<GasCondensateContentWmrTableViewModel>> GetGasCondensateContentWmrByFilter(
            int placeId, [FromQuery] int? pointId = null, [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null) =>
            await _gasCondensateContentWmrService
                .GetGasCondensateContentWmrByFilter(placeId, pointId, startDate, endDate)
                .ConfigureAwait(false);

        [HttpGet]
        [Route("chart/{placeId:int}")]
        [Produces("application/json")]
        public async Task<ChartViewModel> GetChartInfoOfGasCondensateContentWmr(int placeId,
            [FromQuery] int? pointId, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate) =>
            await _gasCondensateContentWmrService
                .GetChartInfoOfGasCondensateContentWmr(placeId, pointId, startDate, endDate).ConfigureAwait(false);

        [HttpGet]
        [Route("{id:int}")]
        [Produces("application/json")]
        public async Task<GasCondensateContentWmrViewModel> GetGasCondensateContentWmrById(int id) =>
            await _gasCondensateContentWmrService.GetGasCondensateContentWmrById(id).ConfigureAwait(false);

        [HttpPost]
        [Route("")]
        public async Task<bool> CreateGasCondensateContentWmr([FromBody] GasCondensateContentWmrViewModel model) =>
            await _gasCondensateContentWmrService.CreateGasCondensateContentWmr(model).ConfigureAwait(false);

        [HttpPut]
        public async Task<bool> UpdateGasCondensateContentWmr([FromBody] GasCondensateContentWmrViewModel model) =>
            await _gasCondensateContentWmrService.UpdateGasCondensateContentWmr(model).ConfigureAwait(false);

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<bool> DeleteGasCondensateContentWmr(int id) =>
            await _gasCondensateContentWmrService.DeleteGasCondensateContentWmr(id).ConfigureAwait(false);
    }
}