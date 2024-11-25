using System.ComponentModel.DataAnnotations;

namespace SolessBackEndFix.Models
{
    public class OrderItem
    {
        [Key]
        public long Id { get; set; }

        public long OrderId { get; set; }
        public Order Order { get; set; }  // Relación con Order

        public long ProductId { get; set; }
        public Product Product { get; set; }  // Relación con el producto

        public int Quantity { get; set; }
        public decimal Price { get; set; }  // Precio unitario en el momento de la compra
    }
}
