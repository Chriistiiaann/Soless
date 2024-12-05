using Microsoft.EntityFrameworkCore;
using SolessBackend.Data;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataBaseContext _context;

        public OrderRepository(DataBaseContext context)
        {
            _context = context;
        }

        public async Task AddOrderAsync(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
        }

        public async Task<Order> GetOrderByIdAsync(long id)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<ICollection<Order>> GetOrdersByUserIdAsync(long userId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product) // Incluye la información del producto
                .ToListAsync();
        }


        //public async Task<ICollection<Order>> GetOrdersByUserIdAsync(long userId)
        //{
        //    return await _context.Orders
        //        .Where(o => o.UserId == userId)
        //        .Include(o => o.OrderItems)
        //        .ToListAsync();
        //}


        // Verifica si el usuario ha comprado el producto
        public async Task<bool> HasUserPurchasedProductAsync(long userId, long productId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .AnyAsync(o => o.OrderItems.Any(oi => oi.ProductId == productId));
        }
    }
}
