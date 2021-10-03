using LinqToDB;
using LinqToDB.Configuration;
using LinqToDB.Data;
using PLIMS.Common.Configuration;
using PLIMS.DataAccess.Entities;

namespace PLIMS.DataAccess.Settings
{
    public class AppDataConnection : DataConnection
    {
        public ITable<SamplingPlacesEntity> Places => GetTable<SamplingPlacesEntity>();
        public ITable<PointEntity> Points => GetTable<PointEntity>();
        public ITable<UserEntity> Users => GetTable<UserEntity>();
        public ITable<ChemicalAnalysisEntity> ChemicalAnalysis => GetTable<ChemicalAnalysisEntity>();

        public ITable<GasCondensateContentWmrEntity> GasCondensateContentWmr =>
            GetTable<GasCondensateContentWmrEntity>();
        
        private readonly IAppConfigurationProvider _configurationProvider;

        public AppDataConnection(LinqToDbConnectionOptions<AppDataConnection> options)
            :base(options)
        {

        }
    }
}