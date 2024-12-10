using SolessBackEndFix.DTO;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.DataMappers
{
    public class OrderMapper
    {

        public OrderDTO OrderToDTO(Order order)
        {
            return new OrderDTO
            {
                UserId = order.UserId,
                OrderDate = order.OrderDate,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDTO
                {
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    Price = oi.Price,
                    Img_Name = oi.Product?.Img_Name,
                    Model = oi.Product?.Model
         
                }).ToList()
            };
        }

        public Order DTOToOrder(OrderDTO orderDto)
        {
            return new Order
            {
                UserId = orderDto.UserId,
                OrderDate = DateTime.UtcNow,
                OrderItems = orderDto.OrderItems.Select(oiDto => new OrderItem
                {
                    ProductId = oiDto.ProductId,
                    Quantity = oiDto.Quantity,
                    Price = oiDto.Price
                }).ToList()
            };
        }
    }
}
