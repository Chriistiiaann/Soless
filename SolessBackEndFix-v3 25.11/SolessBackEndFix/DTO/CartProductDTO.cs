using SolessBackEndFix.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SolessBackEndFix.DTO
{
    public class CartProductDTO
    {
        public long CartId { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CartProductInCartDTO //DTO para mostrar la información sobre el producto dentro del carrito
    {
        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public double ProductPrice { get; set; }
        public int Quantity { get; set; }
        public double TotalPriceObject {  get; set; }
    }
}
