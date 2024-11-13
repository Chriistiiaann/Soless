using SolessBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace SolessBackEndFix.Models
{
    public class Order
    {
        [Key]
        public long Id { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }  // Relación con la clase User

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();  // Relación con OrderItem
    }

}
