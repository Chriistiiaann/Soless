using Microsoft.EntityFrameworkCore;
using SolessBackend.Data;
using SolessBackEndFix.DTO;
using SolessBackEndFix.Interfaces;
using SolessBackEndFix.Models;


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

        public async Task UpdateStockAsync(long ProductId, int stockRestar)
        {
            var productVariado = _context.Products.FirstOrDefault(p => p.Id == ProductId);


            if (productVariado == null)
            {
                throw new Exception("La variación del producto no existe.");
            }

            if (productVariado.Stock < stockRestar) 
            {
                throw new Exception("No hay suficiente stock disponible.");
            }

            productVariado.Stock -= stockRestar;

            _context.SaveChanges();
        }
        public async Task UpdateAllAsync(Product product)
        {
            var productVariado = _context.Products.FirstOrDefault(p => p.Id == product.Id);

            if (productVariado == null)
            {
                throw new Exception("La variación del producto no existe.");
            }

            if (product.Stock < 0)
            {
                throw new Exception("No se puede poner menos de 0 de stock");
            }

            if (product.Original_Price < 0 || product.Discount_Price < 0)
            {
                throw new Exception("No puede costar menos de 0 euros");
            }

            productVariado.Brand = product.Brand;
            productVariado.Model = product.Model;
            productVariado.Original_Price = product.Original_Price;
            productVariado.Discount_Price = product.Discount_Price;
            productVariado.Stock = product.Stock;
            productVariado.Img_Name = product.Img_Name;
            productVariado.Description = product.Description;
            productVariado.Composition = product.Composition;

            _context.Products.Update(productVariado);
            await _context.SaveChangesAsync();
        }
    }
}
