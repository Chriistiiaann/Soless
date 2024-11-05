using Microsoft.EntityFrameworkCore;
using SolessBackend.Data;
using SolessBackend.Models;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SolessBackEndFix.Repositories
{
    public class ProductRepository : IProductRepository // Implementación explícita de la interfaz
    {
        private readonly DataBaseContext _context;

        public ProductRepository(DataBaseContext context)
        {
            _context = context;
        }

        //Obtenemos todos los productos de nuestro catálogo
        public async Task<ICollection<Product>> GetProductsAsync()
        {
            return await _context.Products.OrderBy(u => u.Id).ToListAsync();
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<Product> GetProductByIdAsync(long id)
        {
            return await _context.Products.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Product> GetProductByName(string name)
        {
            return await _context.Products.FirstOrDefaultAsync(u => u.Name == name);
        }
    }
}
