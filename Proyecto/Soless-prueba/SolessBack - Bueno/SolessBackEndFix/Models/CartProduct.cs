using SolessBackend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SolessBackEndFix.Models;

public class CartProduct
{
    [Key]
    public int Id { get; set; }
    public int? Quantity { get; set; }
    public double? TotalPriceObject { get; set; }

    [ForeignKey("Product")]
    public long ProductId { get; set; }
    public Product Product { get; set; }

    [ForeignKey("Cart")]
    public long CartId { get; set; } 
    public Cart Cart { get; set; }
}
