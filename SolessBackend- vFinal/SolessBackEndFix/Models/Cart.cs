using SolessBackend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SolessBackEndFix.Models
{
    public class Cart
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("User")]
        public long UserId { get; set; }
        public User User { get; set; }
        public ICollection<CartProduct> CartProducts { get; set; } = new List<CartProduct>(); 
        public double TotalPrice { get; set; }

    }
}
