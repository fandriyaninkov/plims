namespace PLIMS.Models.ViewModels
{
    public class TreeItem
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public int? ParentId { get; set; }
    }
}