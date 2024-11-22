using Microsoft.AspNetCore.Mvc;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace SolessBackEndFix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly CartMapper _cartMapper;

        public CartController(ICartRepository cartRepository, IProductRepository productRepository, CartMapper cartMapper)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository; 
            _cartMapper = cartMapper;
        }

        
        [HttpGet("GetCart/{cartId}")]
        public async Task<IActionResult> GetCartById(long cartId)
        {
            var cart = await _cartRepository.GetCartByIdAsync(cartId);

            if (cart == null)
            {
                return NotFound("Carrito no encontrado.");
            }

            var cartDTO = new
            {
                CartId = cart.Id,
                UserId = cart.UserId,

                CartProducts = cart.CartProducts.Select(cp => new
                {
                    ProductId = cp.ProductId,
                    ProductName = cp.Product.Model,
                    ProductPrice = cp.Product.Original_Price,
                    ProductImage = cp.Product.Img_Name,
                    Quantity = cp.Quantity,
                    TotalPriceObject = cp.Product.Original_Price * cp.Quantity
                }).ToList(),
                TotalPrice = cart.CartProducts
                    .Sum(cp => cp.Product.Original_Price * cp.Quantity)
            };

            return Ok(cartDTO);
        }


        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCartAsync([FromBody] CartProductDTO addProductToCartDTO)
        {
            if (addProductToCartDTO == null)
            {
                return BadRequest("Información necesaria no enviada.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var cart = await _cartRepository.GetCartByIdAsync(addProductToCartDTO.CartId);

                if (cart == null)
                {
                    return BadRequest("Carrito no encontrado.");
                }

                var product = await _productRepository.GetProductByIdAsync(addProductToCartDTO.ProductId);
                if (product == null)
                {
                    return NotFound("Producto no encontrado.");
                }

                if (addProductToCartDTO.Quantity > product.Stock)
                {
                    return BadRequest("No hay suficiente stock disponible.");
                }

                var existingCartProduct = cart.CartProducts
                    .FirstOrDefault(cp => cp.ProductId == addProductToCartDTO.ProductId);

                if (existingCartProduct != null)
                {
                    if (existingCartProduct.Quantity + addProductToCartDTO.Quantity > product.Stock)
                    {
                        return BadRequest("No hay suficiente stock disponible para esta cantidad.");
                    }
                    existingCartProduct.Quantity += addProductToCartDTO.Quantity;
                }
                else
                {
                    var cartProduct = new CartProduct
                    {
                        CartId = cart.Id,        
                        ProductId = addProductToCartDTO.ProductId,
                        Quantity = addProductToCartDTO.Quantity
                    };
                    cart.CartProducts.Add(cartProduct);
                }

                await _cartRepository.SaveChangesAsync();

                if (!product.Original_Price.HasValue)
                {
                    return BadRequest("El precio del producto no está disponible.");
                }

                var productInCartDTO = new CartProductInCartDTO
                {
                    ProductId = product.Id,
                    ProductName = product.Model,
                    ProductImage = product.Img_Name,
                    Quantity = addProductToCartDTO.Quantity,
                    ProductPrice = product.Original_Price.Value,
                    TotalPriceObject = product.Original_Price.Value * addProductToCartDTO.Quantity
                };

                return Ok(new
                {
                    message = "Producto añadido al carrito exitosamente.",
                    product = productInCartDTO
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno en el servidor: " + ex.Message);
            }
        }

        [HttpDelete("cart/{cartId}/product/{productId}")]
        public async Task<IActionResult> RemoveProductFromCart(long cartId, long productId)
        {
            var resultMessage = await _cartRepository.RemoveProductFromCartAsync(cartId, productId);

            return Ok("Producto eliminado correctamente del carrito.");
        }


        [HttpPut("update-product")]
        public async Task<IActionResult> UpdateProductQuantityAsync([FromBody] CartProductDTO cartProductDTO)
        {
            try
            {
                await _cartRepository.UpdateProductAsync(cartProductDTO);

                return Ok(new
                {
                    message = "Product actualizado correctamente",
                    cartId = cartProductDTO.CartId,
                    productId = cartProductDTO.ProductId,
                    quantity = cartProductDTO.Quantity
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
