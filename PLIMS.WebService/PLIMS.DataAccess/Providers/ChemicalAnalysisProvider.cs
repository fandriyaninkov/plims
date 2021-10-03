using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinqToDB;
using PLIMS.Common;
using PLIMS.DataAccess.DTO;
using PLIMS.DataAccess.Entities;
using PLIMS.DataAccess.Providers.Interfaces;
using PLIMS.DataAccess.Settings;

namespace PLIMS.DataAccess.Providers
{
    public class ChemicalAnalysisProvider : IChemicalAnalysisProvider
    {
        private readonly AppDataConnection _connection;

        public ChemicalAnalysisProvider(AppDataConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<ChemicalAnalysisDTO>> GetAnalysisInfo()
        {
            // await using var db = _connection;
            var query = from a in _connection.ChemicalAnalysis
                from pt in _connection.Points.Where(x => x.Id == a.PointId).DefaultIfEmpty()
                from pl in _connection.Places.Where(x => x.Id == pt.PlaceId).DefaultIfEmpty()
                from u in _connection.Users.Where(x => x.Id == a.UserId).DefaultIfEmpty()
                select
                    new ChemicalAnalysisDTO
                    {
                        Id = a.Id.Value,
                        AnalysisDate = a.AnalysisDate,
                        DeliveringDate = a.DeliveringDate,
                        SamplingDate = a.SamplingDate,
                        RegCode = a.RegCode,
                        PlaceName = pl.Name,
                        PointName = pt.Name,
                        UserName = StringUtils.GetFullName(u.FirstName, u.LastName, u.Patronymic)
                    };

            var res = await query.ToListAsync().ConfigureAwait(false);

            return res;
        }

        public async Task<IEnumerable<ChemicalAnalysisDTO>> GetChemicalAnalysesByFilter(int placeId, int? pointId, DateTime? date)
        {
            var query = from a in _connection.ChemicalAnalysis
                from pt in _connection.Points.Where(x => x.Id == a.PointId).DefaultIfEmpty()
                from pl in _connection.Places.Where(x => x.Id == pt.PlaceId).DefaultIfEmpty()
                from u in _connection.Users.Where(x => x.Id == a.UserId).DefaultIfEmpty()
                where pl.Id == placeId
                      && (!pointId.HasValue || pointId.Value == pt.Id)
                      && (!date.HasValue || (a.SamplingDate.HasValue && date.Value.Year == a.SamplingDate.Value.Year &&
                                             date.Value.Month == a.SamplingDate.Value.Month))
                select
                    new ChemicalAnalysisDTO
                    {
                        Id = a.Id.Value,
                        AnalysisDate = a.AnalysisDate,
                        DeliveringDate = a.DeliveringDate,
                        SamplingDate = a.SamplingDate,
                        RegCode = a.RegCode,
                        PlaceName = pl.Name,
                        PointName = pt.Name,
                        UserName = StringUtils.GetFullName(u.FirstName, u.LastName, u.Patronymic)
                    };

            var res = await query.ToListAsync().ConfigureAwait(false);

            return res;
        }

        public async Task<ChemicalAnalysisEditDTO> GetAnalysisById(int analysisId)
        {
            var query = from a in _connection.ChemicalAnalysis
                from pt in _connection.Points.Where(x => x.Id == a.PointId).DefaultIfEmpty()
                from pl in _connection.Places.Where(x => x.Id == pt.PlaceId).DefaultIfEmpty()
                from u in _connection.Users.Where(x => x.Id == a.UserId).DefaultIfEmpty()
                where a.Id == analysisId
                select
                    new ChemicalAnalysisEditDTO
                    {
                        Id = a.Id.Value,
                        AnalysisDate = a.AnalysisDate,
                        DeliveringDate = a.DeliveringDate,
                        SamplingDate = a.SamplingDate,
                        RegCode = a.RegCode,
                        CondensateContent = a.CondensateContent,
                        WmrContent = a.WmrContent,
                        MassFractionOfMethanol = a.MassFractionOfMethanol,
                        MassFractionOfMethanolError = a.MassFractionOfMethanolError,
                        MassFractionOfMethanolNotAvailable = a.MassFractionOfMethanolNotAvailable,
                        MassFractionOfWater = a.MassFractionOfWater,
                        MassFractionOfWaterError = a.MassFractionOfWaterError,
                        MassFractionOfWaterNotAvailable = a.MassFractionOfWaterNotAvailable,
                        MassConcentrationOfCorrosionInhibitor = a.MassConcentrationOfCorrosionInhibitor,
                        MassConcentrationOfCorrosionInhibitorNotAvailable = a.MassConcentrationOfCorrosionInhibitorNotAvailable,
                        Place = new IdNameDTO {Id = pl.Id.Value, Name = pl.Name},
                        Point = new IdNameDTO {Id = pt.Id.Value, Name = pt.Name},
                        User = new IdNameDTO
                            {Id = u.Id.Value, Name = StringUtils.GetFullName(u.FirstName, u.LastName, u.Patronymic)}
                    };

            var res = await query.FirstAsync().ConfigureAwait(false);

            return res;
        }

        public async Task<bool> CreateOrUpdateAnalysis(ChemicalAnalysisEntity entity)
        {
            if (entity.Id.HasValue)
            {
                var res = await _connection.UpdateAsync(entity).ConfigureAwait(false);
                return true;
            }

            var result = await _connection.InsertAsync(entity).ConfigureAwait(false);

            return true;
        }

        public async Task<bool> DeleteAnalysis(int id)
        {
            var res = await _connection.ChemicalAnalysis.DeleteAsync(x => x.Id.Value == id).ConfigureAwait(false);
            return true;
        }
    }
}