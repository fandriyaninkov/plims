using LinqToDB.Mapping;

namespace PLIMS.DataAccess.Entities
{
    [Table(Name = "Places")]
    public class SamplingPlacesEntity
    {
        [PrimaryKey, Identity]
        public int? Id { get; set; }
        
        [Column]
        public string Name { get; set; }
    }
}