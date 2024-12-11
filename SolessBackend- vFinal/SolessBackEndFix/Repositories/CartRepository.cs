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

    public async Task RemoveProductFromCartAsync(long cartId, long productId)
    {
        var cartProduct = await _context.CartProducts
                                        .FirstOrDefaultAsync(cp => cp.CartId == cartId && cp.ProductId == productId);

        _context.CartProducts.Remove(cartProduct);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveAllProductsFromCartAsync(long cartId)
    {
        var cartProducts = await _context.CartProducts
                                          .Where(cp => cp.CartId == cartId)
                                          .ToListAsync();

        _context.CartProducts.RemoveRange(cartProducts);

        await _context.SaveChangesAsync();
    }

    public async Task UpdateProductAsync(CartProductDTO cartProductDTO)
    {
        var cartProduct = await _context.CartProducts
            .Include(cp => cp.Product)
            .FirstOrDefaultAsync(cp => cp.CartId == cartProductDTO.CartId && cp.ProductId == cartProductDTO.ProductId);

        if (cartProduct == null)
        {
            throw new Exception("Producto no encontrado en el carrito"); 
        }

        if (cartProductDTO.Quantity > cartProduct.Product.Stock)
        {
            throw new Exception("No hay suficiente stock para la cantidad solicitada");
        }

        if (cartProductDTO.Quantity <= 0)
        {
            throw new Exception("La cantidad debe ser mayor a 0");
        }
        cartProduct.Quantity = cartProductDTO.Quantity;

        cartProduct.TotalPriceObject = cartProduct.Quantity * (cartProduct.Product.Original_Price ?? 0.0);

        var cart = await _context.Carts
            .Include(c => c.CartProducts)
            .FirstOrDefaultAsync(c => c.Id == cartProductDTO.CartId);

        if (cart == null)
        {
            throw new Exception("El carrito no encontrado");
        }

        cart.TotalPrice = cart.CartProducts.Sum(cp => cp.TotalPriceObject ?? 0.0);

        await _context.SaveChangesAsync();
    }





}
