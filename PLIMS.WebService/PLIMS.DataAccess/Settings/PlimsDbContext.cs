using LinqToDB.Data;

namespace PLIMS.DataAccess.Settings
{
    public class PlimsDbContext : DataConnection
    {
        public PlimsDbContext() : base("Plims")
        {
            
        }
    }
}