using LinqToDB.Mapping;

namespace PLIMS.DataAccess.Entities
{
    [Table(Name = "Users")]
    public class UserEntity
    {
        [PrimaryKey, Identity]
        public int? Id { get; set; }
        
        [Column]
        public string FirstName { get; set; }
        
        [Column]
        public string LastName { get; set; }
        
        [Column]
        public string Patronymic { get; set; }
    }
}