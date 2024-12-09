using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using SolessBackend.Models;
using SolessBackEndFix.Models;
using System.Diagnostics;

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
            string ConnectionString = "Server=db10879.databaseasp.net; Database=db10879; Uid=db10879; Pwd=Bn9?2R=ho6Y+;";

            #if DEBUG
                optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
            #else
                optionsBuilder.UseMySql(ConnectionString, ServerVersion.AutoDetect(ConnectionString));
            #endif

            //optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");

            //optionsBuilder.UseMySql(ConnectionString, ServerVersion.AutoDetect(ConnectionString));
        }
    }
}
