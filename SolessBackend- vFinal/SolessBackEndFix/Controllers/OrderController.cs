using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolessBackEndFix.DataMappers;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;

namespace SolessBackEndFix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly OrderMapper _orderMapper;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;

        public OrdersController(IOrderRepository orderRepository, OrderMapper orderMapper, ICartRepository cartRepository, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _orderMapper = orderMapper;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDTO orderDto)
        {
            var order = _orderMapper.DTOToOrder(orderDto);

            foreach (var item in order.OrderItems)
            {
                var product = await _productRepository.GetProductByIdAsync(item.ProductId);

                if (product == null)
                {
                    return BadRequest($"El producto con ID {item.ProductId} no existe.");
                }

                if (product.Stock < item.Quantity)
                {
                    return BadRequest($"No hay suficiente stock para el producto con ID {item.ProductId}. Stock disponible: {product.Stock}, solicitado: {item.Quantity}.");
                }
            }

            foreach (var producto in order.OrderItems)
            {
                await _productRepository.UpdateStockAsync(producto.ProductId, producto.Quantity);
            }

            await _orderRepository.AddOrderAsync(order);
            await _cartRepository.RemoveAllProductsFromCartAsync(order.UserId);
            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, orderDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(long id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(_orderMapper.OrderToDTO(order));
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersByUserId(long userId)
        {
            var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
            //return Ok(orders.Select(_orderMapper.OrderToDTO).ToList());

            var orderDtos = orders.Select(order => _orderMapper.OrderToDTO(order)).ToList();
            return Ok(orderDtos);


        }
    }
}
