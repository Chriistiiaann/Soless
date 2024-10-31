using Microsoft.EntityFrameworkCore;
using SolessBackend.Models;

namespace SolessBackend.Data
{
    public class DataBaseContext : DbContext
    {
        private const string DATABASE_PATH = "ecommerce.db";

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
        }
    }
}
