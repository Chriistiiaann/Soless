﻿using Microsoft.AspNetCore.Mvc;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Interfaces;

public interface ICartRepository
{
    Task<Cart> GetCartByIdAsync(long cartId);
    Task AddToCartAsync(CartProduct cartProduct);
    Task SaveChangesAsync();
    Task AddCartToUserAsync(Cart cart);
    Task RemoveProductFromCartAsync(long cartId, long productId);
    Task UpdateProductAsync(CartProductDTO cartProductDTO);
    Task RemoveAllProductsFromCartAsync(long cartId);
}
