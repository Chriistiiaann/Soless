using Microsoft.EntityFrameworkCore;
using SolessBackend.Models;
using SolessBackEndFix.Models;

namespace SolessBackend.Data
{
    public class DataBaseContext : DbContext
    {
        private const string DATABASE_PATH = "ecommerce.db";

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartProduct> CartProducts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
        }
    }
}
