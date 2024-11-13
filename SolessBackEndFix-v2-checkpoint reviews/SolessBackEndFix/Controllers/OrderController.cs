using Microsoft.AspNetCore.Mvc;
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

        public OrdersController(IOrderRepository orderRepository, OrderMapper orderMapper)
        {
            _orderRepository = orderRepository;
            _orderMapper = orderMapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDTO orderDto)
        {
            var order = _orderMapper.DTOToOrder(orderDto);
            await _orderRepository.AddOrderAsync(order);
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
            return Ok(orders.Select(_orderMapper.OrderToDTO).ToList());
        }
    }
}
