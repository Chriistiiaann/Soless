using Microsoft.EntityFrameworkCore;
using SolessBackend.Data;
using SolessBackend.Models;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolessBackEndFix.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataBaseContext _context;

        public ProductRepository(DataBaseContext context)
        {
            _context = context;
        }

        //Devuelve todos los productos sin paginación
        public async Task<ICollection<Product>> GetProductsAsync()
        {
            return await _context.Products.OrderBy(u => u.Id).ToListAsync();
        }

        //Devuelve productos según el offset y el límite
        public async Task<ICollection<Product>> GetProductsAsync(int offset, int limit)
        {
            // Aplica la paginación a la consulta
            return await _context.Products
                .OrderBy(u => u.Id)
                .Skip(offset)         // Salta el número de elementos determinado por el offset
                .Take(limit)          // Toma el número de elementos determinado por el límite
                .ToListAsync();
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }
        public async Task AddProductsAsync(IEnumerable<Product> products)
        {
            _context.Products.AddRange(products);
            await _context.SaveChangesAsync();
        }
        public async Task<Product> GetProductByIdAsync(long id)
        {
            return await _context.Products.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Product> GetProductByModel(string model)
        {
            return await _context.Products.FirstOrDefaultAsync(u => u.Model == model);
        }

        public async Task<int> GetTotalProductCountAsync()
        {
            return await _context.Products.CountAsync();
        }

        public async Task<ICollection<Product>> AscPriceProduct()
        {
            var productos = await _context.Products.ToListAsync();
            return productos.OrderBy(p => p.Original_Price).ToList();
        }

        public async Task<ICollection<Product>> DescPriceProduct()
        {
            var productos = await _context.Products.ToListAsync();
            return productos.OrderByDescending(p => p.Original_Price).ToList();
        }

        public Task<ICollection<Product>> AtoZProductAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Product>> ZtoAProductAsync()
        {
            throw new NotImplementedException();
        }
    }
}
