using SolessBackEndFix.Models;

namespace SolessBackEndFix.Interfaces
{
    public interface IOrderRepository
    {
        Task<ICollection<Order>> GetOrdersByUserIdAsync(long userId);
        Task<Order> GetOrderByIdAsync(long id);
        Task AddOrderAsync(Order order);
        Task<bool> HasUserPurchasedProductAsync(long userId, long productId);
    }
}
