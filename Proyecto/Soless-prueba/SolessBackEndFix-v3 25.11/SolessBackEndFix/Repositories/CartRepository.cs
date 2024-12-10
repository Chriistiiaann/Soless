using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolessBackend.Data;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Repositories;

public class CartRepository : ICartRepository
{

    private readonly DataBaseContext _context;

    public CartRepository(DataBaseContext context)
    {
        _context = context;
    }
    
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync(); 
    }

    public async Task<Cart> GetCartByIdAsync(long cartId)
    {
        return await _context.Carts
            .Include(c => c.CartProducts)  
            .ThenInclude(cp => cp.Product) 
            .FirstOrDefaultAsync(c => c.Id == cartId);
    }


    public async Task AddToCartAsync(CartProduct cartProduct)
    {
        var cartProductDTO = new CartProductDTO
        {
            CartId = cartProduct.CartId,
            ProductId = cartProduct.ProductId,
            Quantity = cartProduct.Quantity ?? 0 
        };

        var cart = await _context.Carts
            .Include(c => c.CartProducts)  
            .FirstOrDefaultAsync(c => c.Id == cartProductDTO.CartId);

        if (cart == null)
        {
            throw new Exception("Carrito no encontrado.");
        }

        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == cartProductDTO.ProductId);

        if (product == null)
        {
            throw new Exception("Producto no encontrado.");
        }

        if (cartProductDTO.Quantity > product.Stock)
        {
            throw new Exception("No hay suficiente stock disponible.");
        }

        var existingProduct = cart.CartProducts
            .FirstOrDefault(cp => cp.ProductId == cartProductDTO.ProductId);

        if (existingProduct != null)
        {
            if (existingProduct.Quantity + cartProductDTO.Quantity > product.Stock)
            {
                throw new Exception("No hay suficiente stock disponible para esta cantidad.");
            }
            existingProduct.Quantity += cartProductDTO.Quantity;  
        }
        else
        {
            var newCartProduct = new CartProduct
            {
                CartId = cart.Id, 
                ProductId = cartProductDTO.ProductId,
                Quantity = cartProductDTO.Quantity
            };

            cart.CartProducts.Add(newCartProduct); 
        }
        await _context.SaveChangesAsync();
    }

    public async Task AddCartToUserAsync(Cart cart)
    {
        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();
    }

    public async Task<string> RemoveProductFromCartAsync(long cartId, long productId)
    {
        var cartProduct = await _context.CartProducts
                                        .FirstOrDefaultAsync(cp => cp.CartId == cartId && cp.ProductId == productId);

        _context.CartProducts.Remove(cartProduct);
        await _context.SaveChangesAsync();

        return "Producto eliminado correctamente del carrito.";
    }

    public async Task<IActionResult> UpdateProductAsync(CartProductDTO cartProductDTO)
    {
        var cartProduct = await _context.CartProducts
            .Include(cp => cp.Product) 
            .FirstOrDefaultAsync(cp => cp.CartId == cartProductDTO.CartId && cp.ProductId == cartProductDTO.ProductId);

        if (cartProduct == null)
        {
            return new NotFoundObjectResult("Product not found in cart");
        }
        if (cartProductDTO.Quantity > cartProduct.Product.Stock)
        {
            return new BadRequestObjectResult("Not enough stock available for this quantity.");
        }

        cartProduct.Quantity = cartProductDTO.Quantity;

        cartProduct.TotalPriceObject = cartProduct.Quantity * (cartProduct.Product.Original_Price ?? 0.0);

        var cart = await _context.Carts
            .Include(c => c.CartProducts)
            .FirstOrDefaultAsync(c => c.Id == cartProductDTO.CartId);

        if (cart == null)
        {
            return new NotFoundObjectResult("Cart not found");
        }

        cart.TotalPrice = cart.CartProducts.Sum(cp => cp.TotalPriceObject ?? 0.0);

        await _context.SaveChangesAsync();

        return new OkObjectResult(new
        {
            message = "Product updated successfully",
            cartId = cartProductDTO.CartId,
            productId = cartProductDTO.ProductId,
            quantity = cartProductDTO.Quantity
        });
    }

    public Task TransferTemporaryCartToUserAsync(string sessionId, object id)
    {
        throw new NotImplementedException();
    }
}
