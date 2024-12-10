using SolessBackEndFix.DTO;
using SolessBackEndFix.Models;

public class CartMapper
{
    public CartDTO CartToDTO(Cart cart)
    {
        return new CartDTO
        {
            UserId = cart.UserId,
            CartProducts = cart.CartProducts.Select(cp => new CartProductDTO
            {
                ProductId = cp.ProductId,
                Quantity = cp.Quantity ?? 0
            }).ToList()
        };
    }

    public Cart DTOToCart(CartDTO cartDto)
    {
        return new Cart
        {
            UserId = cartDto.UserId,
            CartProducts = cartDto.CartProducts.Select(c => new CartProduct  
            {
                ProductId = c.ProductId,
                Quantity = c.Quantity  
            }).ToList()
        };
    }
}
