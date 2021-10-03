using LinqToDB.Mapping;

namespace PLIMS.DataAccess.Entities
{
    [Table(Name = "Points")]
    public class PointEntity
    {
        [PrimaryKey, Identity]
        public int? Id { get; set; }
        
        [Column]
        public string Name { get; set; }
        
        [Column]
        public int? PlaceId { get; set; }
    }
}