using System.ComponentModel.DataAnnotations;

namespace SolessBackEndFix.DTO
{
    public class ProductDTO
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public double? Price { get; set; }
        public Boolean? Stock { get; set; }
        public string? Img { get; set; }
        public int? Review { get; set; }
        public string Description { get; set; }
        
    }
}
